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

// func (liked_by *Likes) LikePost() (*Likes,Exist){
// 	var b Exist
// 	db.Raw(`SELECT
// 	id,
// 	EXISTS(
// 		SELECT
// 		likes.user_id,
// 		post_id,
// 		users.username
// 		FROM
// 		likes
// 		JOIN users ON users.id = likes.user_id
// 		WHERE
// 		likes.user_id = ?
// 		AND ? = likes.post_id
// 	)
// 	FROM
// 	posts
	
// 	`,liked_by.UserID,liked_by.PostID).Scan(&b)
// 	if !b.Exists{
// 		db.Create(&liked_by) 
// 		db.Model(&Posts{}).Where("ID = ?", liked_by.PostID).Update("likes", gorm.Expr("likes + ?", 1))
// 	}
	
// 	return liked_by,b
// }