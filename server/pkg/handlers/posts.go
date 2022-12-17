package handlers

import (
	"net/http"
	"server/pkg/models"
	"strconv"

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

func GetPostByID(c echo.Context) error {
	id := c.Param("id")
	post := models.GetPostByID(id)
	return c.JSON(http.StatusOK,post)
}

func EditPost(c echo.Context) error {
	post := new(models.Posts)
	id,_ := strconv.Atoi(c.Param("id"))
	err := c.Bind(&post); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	p := models.Posts{
		ID: id,
		Content: post.Content,
	}

	new_data:= p.EditPost()

	return c.JSON(http.StatusOK,new_data)

}

func DeletePost(c echo.Context) error {
	id := c.Param("id")
    deletedPost:= models.DeletePost(id)
    return c.JSON(http.StatusOK,deletedPost)
}

