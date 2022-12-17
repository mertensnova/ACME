package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type Comments struct{
	gorm.Model
	ID int           `gorm:"primaryKey;autoIncrement"`
    Comment string `form:"content" json:"content"`
    Likes int `json:"likes"`
	UserID uint64 `json:"userid"`
	
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Likes{})
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