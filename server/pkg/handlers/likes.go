package handlers

import (
	"net/http"
	"server/pkg/models"

	"github.com/labstack/echo/v4"
)

func LikePost(c echo.Context) error {
	liked_by := new(models.LikesPost)

	err := c.Bind(&liked_by); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

  	like := models.LikesPost{
	PostID: liked_by.PostID,
	UserID: liked_by.UserID,
  	}

	// Add to database
	b,exists := like.LikePost()	
	if exists.Exists {
		return c.JSON(http.StatusNotAcceptable, "Already liked the post")
	}


	return c.JSON(http.StatusOK, b)
}

func LikeComment(c echo.Context) error {
	liked_by := new(models.LikesComment)

	err := c.Bind(&liked_by); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

  	like := models.LikesComment{
		UserID: liked_by.UserID,
		CommentID: liked_by.CommentID,
  	}

	// Add to database
	b,exists := like.LikeComment()	
	if exists.Exists {
		return c.JSON(http.StatusNotAcceptable, "Already liked the comment")
	}
	return c.JSON(http.StatusOK, b)
}
