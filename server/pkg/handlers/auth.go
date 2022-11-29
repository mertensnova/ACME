package handlers

import (
	"net/http"
	"server/pkg/models"
	"server/pkg/utils"
	"strings"
	"os"
	"io"
	"ioutil"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, _ := session.Get("session", c)
		session.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   86400 * 7,
			HttpOnly: true,
		  }
		_, ok := session.Values["userID"]

		if strings.Split(c.Path(),"/")[1] == "login" ||
		 strings.Split(c.Path(),"/")[1] == "register"|| 
		 strings.Split(c.Path(),"/")[1] == "dashboard"||
		 strings.Split(c.Path(),"/")[1] == "add-post"  {
			return next(c)
		}
		
		if !ok {
			http.Redirect(c.Response(),c.Request(),"/",http.StatusFound)
			return c.String(http.StatusForbidden, "Unauthorized")
		}
		if session.Values["authenticated"] == false{
			http.Redirect(c.Response(),c.Request(),"/",http.StatusFound)
			return c.String(http.StatusForbidden, "Unauthorized")
		}
		return next(c)
	}
}

func RegisterUser(c echo.Context) error {
	u := new(models.Users)

	err := c.Bind(&u); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}	
	// Hash password
	hash, _ := utils.HashPassword(u.Password)

	file, err := c.FormFile("profile")
	if err != nil {
		return err
	}
	// Create a temporary file within our temp-images directory that follows
    // a particular naming pattern
    tempFile, err := ioutil.TempFile("temp-images", "upload-*.png")
    if err != nil {
        fmt.Println(err)
    }
    defer tempFile.Close()

    // read all of the contents of our uploaded file into a
    // byte array
    fileBytes, err := ioutil.ReadAll(file)
    if err != nil {
        fmt.Println(err)
    }
    // write this byte array to our temporary file
    tempFile.Write(fileBytes)

  	user := models.Users{
	Fullname: u.Fullname,
    Username: u.Username,
    Password: hash,
    Email: u.Email,
  	}

	// Add to database
	b := user.RegisterUser()

	// Set user as authenticated
	session, _ := session.Get("session", c)
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	  }

	session.Values["userID"] = u.ID
	session.Values["authenticated"] = true

	session.Save(c.Request(), c.Response())


	return c.JSON(http.StatusOK, b)
}

func LoginUser(c echo.Context) error {
	u := new(models.Users)
	
    err := c.Bind(&u); if err!= nil {
        return c.String(http.StatusBadRequest, "bad request")
    }
	user := models.Users{
		Password:u.Password,
	}
	
	b := u.LoginUser()
	
	// Check Password Hash
	match := utils.CheckPasswordHash(user.Password,b.Password)

	if!match {
		return c.String(http.StatusForbidden,"Password mismatch")
	}

	// Set user as authenticated
	session, _ := session.Get("session", c)
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
  	}
	session.Values["userID"] = u.ID
	session.Values["authenticated"] = true


	session.Save(c.Request(), c.Response())

	return c.JSON(http.StatusOK, b)
}

func Logout(c echo.Context) error {
	session, _ := session.Get("session", c)
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge: -1,
		HttpOnly: true,
	  }

	delete(session.Values,"userID")
	
	session.Values["authenticated"] = false

    // Revoke users authentication
    session.Save(c.Request(),c.Response())
	return c.JSON(http.StatusOK, "Logout")

}

func GetAllUsers(c echo.Context) error {
	allUsers := models.GetAllUsers()
	return c.JSON(http.StatusOK,allUsers)
}

func DeleteUser(c echo.Context) error {
	id := c.Param("id")
    deletedUser:= models.DeleteUser(id)
    return c.JSON(http.StatusOK,deletedUser)
}