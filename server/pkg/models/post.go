package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type Posts struct{
	gorm.Model
    Content string `form:"content" json:"content"`
    Likes int `json:"likes"`
	UserID uint64 `json:"user_id"`
	User *Users
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
		User:GetUserById(post.UserID),
	}) 
	return post 
}

func GetAllPosts() []Posts{
	var Posts []Posts
	db.Find(&Posts)
    return Posts 
}