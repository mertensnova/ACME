package models

import (
	"server/pkg/config"	
	"gorm.io/gorm"
)

type Comments struct{
	gorm.Model
	ID int       `gorm:"primaryKey;autoIncrement"`
    Reply string `form:"reply" json:"reply"`
    Likes int `json:"likes"`
	UserID uint64 `json:"userid"`
	PostID uint64 `json:"postid"`
}

type CommentResult struct {
	ID  int
	Reply string
	Fullname string
	Username string
	Likes int
	UserID int
	PostID int
	CreatedAt string
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Comments{})
}

func (comment *Comments) AddComment() *Comments{
	db.Create(&Comments{
		Reply: comment.Reply,
		Likes: 0,
		UserID: comment.UserID,
		PostID: comment.PostID,
	}) 
	return comment 
}

func GetCommentsByPosts(id string) []CommentResult{
	var result []CommentResult
	db.Raw(`SELECT comments.reply, comments.likes ,comments.id , users.fullname, users.username,comments.user_id,comments.post_id,comments.created_at
	FROM comments JOIN users ON comments.user_id = users.id JOIN posts ON comments.post_id = posts.id WHERE posts.id = ?`,id).Scan(&result)
    return result
}

func DeleteComment(id string) Comments{
    var deleteComment Comments
	db.Unscoped().Delete(&Comments{}, id)
	return deleteComment
}
