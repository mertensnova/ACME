package models

import (
	"fmt"
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
	fmt.Println(post)
	db.Create(&post) 
	return post 
}
