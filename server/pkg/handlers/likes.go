package handlers

import (
	"fmt"
	"net/http"
	"server/pkg/models"

	"github.com/labstack/echo/v4"
)

func LikePost(c echo.Context) error {
	liked_by := new(models.Likes)

	err := c.Bind(&liked_by); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

  	like := models.Likes{
	PostID: liked_by.PostID,
	UserID: liked_by.UserID,
  	}

	fmt.Println(like.PostID)

	// Add to database
	b := like.LikePost()	
	return c.JSON(http.StatusOK, b)
}
