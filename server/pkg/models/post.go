package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type Posts struct{
	gorm.Model
    Content string `form:"content" json:"content"`
    Likes int `json:"likes"`
	UserID uint64 `json:"userid"`
}

type Result struct {
	ID  int
	Fullname string
	Username string
	Email  string
	Profile string
	Content string
	Likes int
	UserID int
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Posts{})
}

func (post *Posts) AddPost() *Posts{
	db.Create(&Posts{
		Content: post.Content,
		Likes: 0,
		UserID: post.UserID,
	}) 
	return post 
}

func GetAllPosts() []Result{
	var result []Result
	db.Raw("SELECT posts.id,fullname,username,content,email,profile,likes,user_id from posts JOIN users ON posts.user_id = users.id").Scan(&result)
    return result
}
