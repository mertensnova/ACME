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
	var Users []Users
	db.Preload("Posts").Find(&Users)
	// db.Raw("SLE")
    return Users
}
