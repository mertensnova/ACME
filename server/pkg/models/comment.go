package models

import (
	"server/pkg/config"
	// "github.com/labstack/echo/v4"
	

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

// func GetAllComments(c echo.Context) error {
// 	var result []Result
// 	db.Raw("SELECT posts.id,fullname,username,content,email,profile,likes,user_id,bio,posts.created_at from posts JOIN users ON posts.user_id = users.id").Scan(&result)
//     return result
// }

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