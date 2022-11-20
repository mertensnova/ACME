package handlers

import (
	// "fmt"

	"net/http"
	"server/pkg/models"
	"server/pkg/utils"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
)

var store = sessions.NewCookieStore([]byte("super-secret"))


func CheckAuth(c echo.Context) error {
	session, _ := store.Get(c.Request(), "session")
	store.Options = &sessions.Options{
		Domain:   "http://localhost:3000",
		Path:     "/",
		MaxAge:   3600 * 8, // 8 hours
		HttpOnly: true,
	}
	_, ok := session.Values["userID"]
	// fmt.Println("ok:", ok)
	if !ok {
		// http.Redirect(c.Response(), c.Request(), "http://localhost:3000", http.StatusFound) // http.StatusFound is 302
		return c.String(http.StatusForbidden, "Unauthorized")
	}
	return c.String(http.StatusOK, "Authorized")
}

func RegisterUser(c echo.Context) error {
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
	session, _ := store.Get(c.Request(), "session")
	store.Options = &sessions.Options{
		Domain:   "http://localhost:3000",
		Path:     "/",
		MaxAge:   3600 * 8, // 8 hours
		HttpOnly: true,
	}
	// session struct has field Values map[interface{}]interface{}
	session.Values["userID"] = u.ID
	session.Values["authenticated"] = true
	// save before writing to response/return from handler
	session.Save(c.Request(), c.Response())


	return c.JSON(http.StatusOK, b)
}

func LoginUser(c echo.Context) error {
	u := new(models.Users)
	// sess, _ := session.Get("session", c)
	
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
	session, _ := store.Get(c.Request(), "session")
	store.Options = &sessions.Options{
		Domain:   "http://localhost:3000",
		Path:     "/",
		MaxAge:   3600 * 8, // 8 hours
		HttpOnly: true,
	}
// session struct has field Values map[interface{}]interface{}
	session.Values["userID"] = u.ID
	session.Values["authenticated"] = true
// save before writing to response/return from handler
	session.Save(c.Request(), c.Response())

	return c.JSON(http.StatusOK, b)
}

func Logout(c echo.Context) error {
    // sess, _ := session.Get("session", c)
	// session, _ := store.Get(c.Request(), "session")
// 	store.Options = &sessions.Options{
// 		Domain:   "http://localhost:3000",
// 		Path:     "/",
// 		MaxAge:   3600 * 8, // 8 hours
// 		HttpOnly: true,
// 	}
// // session struct has field Values map[interface{}]interface{}
// 	delete(session.Values,"user_id")
// 	// delete(session.Values["userID"])
// 	session.Values["authenticated"] = false

    // // Revoke users authentication
    // session.Save(c.Request(),c.Response())
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