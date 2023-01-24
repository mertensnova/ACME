package handlers

import (
	"net/http"
	"server/pkg/models"
	"server/pkg/utils"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func RegisterUser(c echo.Context) error {

	u := new(models.Users)

	err := c.Bind(&u); if err != nil {
		return c.JSON(http.StatusBadRequest, "Bad Request")
	}	
	
	// Hash password
	hash, _ := utils.HashPassword(u.Password)

	// utils.ServeFrames(u.Profile)
	
  	user := models.Users{
	Fullname: u.Fullname,
    Username: u.Username,
    Password: hash,
    Email: u.Email,
	Bio: u.Bio,
	// Profile: utils.ServeFrames(u.Profile),
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
        return c.String(http.StatusBadRequest, "Bad Request")
    }
	user := models.Users{
		Password:u.Password,
	}
	
	b := u.LoginUser()
	
	// Check Password Hash
	match := utils.CheckPasswordHash(user.Password,b.Password)

	if!match {
		return c.JSON(http.StatusForbidden,"Invalid Credentials")
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