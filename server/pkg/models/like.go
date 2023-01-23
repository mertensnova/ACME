package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type LikesPost struct{
	gorm.Model
    UserID int `json:"userid"`
    PostID int `json:"postid"`
}
type LikesComment struct{
	gorm.Model
    UserID int `json:"userid"`
    CommentID int `json:"commentid"`
}

type Exist struct{
	Exists bool 
	ID int
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&LikesPost{})
	db.AutoMigrate(&LikesComment{})
}


func (liked_by *LikesPost) LikePost() (*LikesPost,Exist){
	var b Exist
	db.Raw(`SELECT
	id,
	EXISTS(
		SELECT
		likes_posts.user_id,
		post_id,
		users.username
		FROM
		likes_posts
		JOIN users ON users.id = likes_posts.user_id
		WHERE
		likes_posts.user_id = ?
		AND ? = likes_posts.post_id
	)
	FROM
	posts
	`,liked_by.UserID,liked_by.PostID).Scan(&b)
	if !b.Exists{
		db.Create(&liked_by) 
		db.Model(&Posts{}).Where("ID = ?", liked_by.PostID).Update("likes", gorm.Expr("likes + ?", 1))
	}
	
	return liked_by,b
}

func (liked_by *LikesComment) LikeComment() (*LikesComment,Exist){
	var b Exist
	db.Raw(`SELECT
	id,
	EXISTS(
		SELECT
		likes_comment.user_id,
		comment_id,
		users.username
		FROM
		likes_comment
		JOIN users ON users.id = likes_comment.user_id
		WHERE
		likes_comment.user_id = ?
		AND ? = likes_comment.comment_id
	)
	FROM
	comments
	`,liked_by.UserID,liked_by.CommentID).Scan(&b)
	if !b.Exists{
		db.Create(&liked_by) 
		db.Model(&Comments{}).Where("ID = ?", liked_by.CommentID).Update("likes", gorm.Expr("likes + ?", 1))
	}
	
	return liked_by,b
}