package handlers

import (
	"fmt"
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
	type New struct{
		posts []models.Result
		liked []models.Result
	}
	

	// user_posts := models.GetPostsOfUser(id);
	// user_liked_posts := models.GetLikedPostsOfUser(id);

	data := New{
		posts : models.GetPostsOfUser(id),
		liked:  models.GetLikedPostsOfUser(id),
	}
	fmt.Println(data)
	
	return c.JSONPretty(http.StatusOK,data," ")
}


// func GetLikedPostsOfUser(c echo.Context) error {
// 	id,err := strconv.ParseUint(c.Param("id"), 10, 64)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest,"Bad Request")
// 	}
// 	user := models.GetLikedPostsOfUser(id);
// 	return c.JSON(http.StatusOK,user)
// }

func DeleteUser(c echo.Context) error {
	id := c.Param("id")
    deletedUser:= models.DeleteUser(id)
    return c.JSON(http.StatusOK,deletedUser)
}