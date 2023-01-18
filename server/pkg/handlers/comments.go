package handlers

import (
	"net/http"
	"server/pkg/models"
	// "fmt"

	"github.com/labstack/echo/v4"
)

func AddComment(c echo.Context) error {
	comments := new(models.Comments)


	err := c.Bind(&comments); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

  	comment := models.Comments{
	Reply: comments.Reply,
	Likes: comments.Likes,
	UserID: comments.UserID,
	PostID: comments.PostID,
  	}
	
	// Add to database
	b := comment.AddComment()

	return c.JSON(http.StatusOK, b)

}

func GetCommentsByPosts(c echo.Context) error {
	
	id := c.Param("id")
	comments := models.GetCommentsByPosts(id)
	return c.JSON(http.StatusOK,comments)

}

