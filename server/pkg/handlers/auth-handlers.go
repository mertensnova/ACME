package handlers

import (
	"net/http"
	"server/pkg/models"
	"server/pkg/utils"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
)


var (
    // key must be 16, 24 or 32 bytes long (AES-128, AES-192 or AES-256)
    key = []byte("super-secret-key")
    store = sessions.NewCookieStore(key)
)

func CheckAuth(c echo.Context) error {
    session, _ := store.Get(c.Request(), "cookie-name")

    // Check if user is authenticated
    if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
        return c.String(http.StatusForbidden,"Unauthenticated")
    }

    // Print secret message
	return c.String(http.StatusOK,"Authenticated")
}


func RegisterUser(c echo.Context) error {
	session, _ := store.Get(c.Request(), "cookie-name")
	u := new(models.Users)
	
	err := c.Bind(&u); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	// Hash password
	hash, _ := utils.HashPassword(u.Password)

  	user := models.Users{
    Username: u.Username,
    Password: hash,
    Email: u.Email,
  	}

	// Add to database
	b := user.RegisterUser()

    // Set user as authenticated
    session.Values["authenticated"] = true
    session.Save(c.Request(), c.Response())
	return c.JSON(http.StatusOK, b)
}

func LoginUser(c echo.Context) error {
	session, _ := store.Get(c.Request(), "cookie-name")
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

	session.Values["authenticated"] = true
    session.Save(c.Request(), c.Response())

	return c.JSON(http.StatusOK, b)
}

func Logout(c echo.Context) error {
    session, _ := store.Get(c.Request(), "cookie-name")

    // Revoke users authentication
    session.Values["authenticated"] = false
    session.Save(c.Request(),c.Response())
	return c.String(http.StatusOK,"User has been logout")

}

func GetAllUsers(c echo.Context) error {
	allUsers := models.GetAllUsers()
	return c.JSON(http.StatusOK,allUsers)
}

func GetUserById(c echo.Context) error {
	id := c.Param("id")
	userData, _ := models.GetUserById(id)
	return c.JSON(http.StatusOK,userData)
}

func DeleteUser(c echo.Context) error {
	id := c.Param("id")
    deletedUser:= models.DeleteUser(id)
    return c.JSON(http.StatusOK,deletedUser)
}

	