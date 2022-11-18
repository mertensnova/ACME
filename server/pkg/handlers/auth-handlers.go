package handlers

import (
	"net/http"
	"server/pkg/models"
	"server/pkg/utils"
	"github.com/labstack/echo/v4"
)


func RegisterUser(c echo.Context) error {
	u := new(models.Users)

	err := c.Bind(&u); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	// Hash password
	hash, _ := utils.HashPassword(u.Password)

  	user := models.Users{
    Username:u.Username,
    Password:hash,
    Email: u.Email,
  	}

	// Add to database
	b := user.RegisterUser()
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

	return c.JSON(http.StatusOK, b)
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

	