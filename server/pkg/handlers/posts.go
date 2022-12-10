package handlers

import (
	"net/http"
	"server/pkg/models"

	"github.com/labstack/echo/v4"
)

func AddPost(c echo.Context) error {
	posts := new(models.Posts)

	err := c.Bind(&posts); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

  	post := models.Posts{
	Content: posts.Content,
	Likes: posts.Likes,
	UserID: posts.UserID,
  	}
	
	// Add to database
	b := post.AddPost()
	

	return c.JSON(http.StatusOK, b)
}

func GetAllPosts(c echo.Context) error {
	allPosts := models.GetAllPosts()
	return c.JSON(http.StatusOK,allPosts)
}

func EditPost(c echo.Context) error {
	post := new(models.Posts)
	err := c.Bind(&post); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	p := models.Posts{
		ID: post.ID,
		Content: post.Content,
	}

	new_data:= p.EditPost()

	return c.JSON(http.StatusOK,new_data)

}

