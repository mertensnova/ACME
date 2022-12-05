package handlers

import (
	"fmt"
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

func LikePosts(c echo.Context) error {
	type ID struct{
		UserID int
	}
	
	user := new(ID)
	fmt.Println(user)
	err := c.Bind(&user); if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	fmt.Println(user.UserID)

	post_id,err := strconv.ParseUint(c.Param("id"), 10, 64)
	// user_id,err := strconv.ParseUint(user.UserID, 10, 64)
    models.LikePost(post_id,user.UserID)
	if err != nil {
		return c.JSON(http.StatusBadRequest,"Bad Request")
	}
	return c.JSON(http.StatusOK,"Liked the Post")
}