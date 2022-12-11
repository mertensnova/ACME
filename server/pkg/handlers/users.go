package handlers

import (
	"net/http"
	"server/pkg/models"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetAllUsers(c echo.Context) error {
	allUsers := models.GetAllUsers()
	return c.JSON(http.StatusOK,allUsers)
}

func GetPostsOfUser(c echo.Context) error {
	id,err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest,"Bad Request")
	}
	
	user_posts,user_liked_posts := models.GetPostsOfUser(id);
	return c.JSON(http.StatusOK, echo.Map{
		"posts": user_posts,
		"liked": user_liked_posts,
	})
}

func UpdateUser(c echo.Context) error {
	user := new(models.Users)
	err := c.Bind(&user); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	
	u := models.Users{
		ID: user.ID,
		Fullname: user.Fullname,
		Username: user.Username,
		Bio: user.Bio,
	}

	new_data:= u.UpdateUser()

	return c.JSON(http.StatusOK,new_data)

}

func DeleteUser(c echo.Context) error {
	id := c.Param("id")
    deletedUser:= models.DeleteUser(id)
    return c.JSON(http.StatusOK,deletedUser)
}