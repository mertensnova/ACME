package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
	pq "github.com/lib/pq"
)

type Posts struct{
	gorm.Model
    Content string `form:"content" json:"content"`
    Likes int `json:"likes"`
	LikedBy pq.Int64Array `gorm:"type:integer[]"`
	UserID uint64 `json:"userid"`
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

func GetAllPosts() []Users{
	var Posts []Users
	db.Preload("Posts").Find(&Posts)
    return Posts 
}