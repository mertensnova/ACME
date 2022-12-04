package models

import (
	"fmt"
	"server/pkg/config"

	pq "github.com/lib/pq"
	"gorm.io/gorm"
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
	var Users []Users
	db.Preload("Posts").Find(&Users)
    return Users
}

func LikePost(post_id uint64,user_id int){
	var posts *Posts
	db.Model(&posts).Where("ID = ?", post_id).Update("likes", gorm.Expr("likes + ?",1))
	fmt.Println(user_id)
}