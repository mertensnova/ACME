package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type Posts struct{
	gorm.Model
	ID int           `gorm:"primaryKey;autoIncrement"`
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
	Bio string
	Likes int
	UserID int
	CreatedAt string
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
	db.Raw("SELECT posts.id,fullname,username,content,email,profile,likes,user_id,bio,posts.created_at from posts JOIN users ON posts.user_id = users.id").Scan(&result)
    return result
}

func GetPostByID(id string) Result{
	var post Result
	db.Raw("SELECT posts.id,fullname,username,content,email,profile,likes,user_id,bio,posts.created_at from posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?",id).Scan(&post)
	return post
}

func (post *Posts) EditPost() *Posts{
	
	db.Model(&post).Where("ID = ?",post.ID).Updates(Posts{Content: post.Content})
	return post
}

func DeletePost(id string) Posts{
    var deletePost Posts
	db.Unscoped().Delete(&Posts{}, id)
	return deletePost
}
