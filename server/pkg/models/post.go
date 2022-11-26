package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type Posts struct{
	gorm.Model
    Content string `form:"content" json:"content"`
    Likes int `json:"likes"`
	UserID  uint `json:"userid"`
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Posts{})
}

func (post *Posts) AddPost() *Posts{
	db.Create(&post) 
	return post 
}

func GetAllPosts() []Posts{
	// Posts[0].ID
	var Posts []Posts
	// var Post []Posts

	db.Find(&Posts)
	// var user Users
	// db.Model(&user).Association("Posts")
	// db.Model(&user).Association("Posts").Find(&Posts)
	// fmt.Println(Posts)
	
    return Posts 
}
