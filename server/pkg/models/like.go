package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

type Likes struct{
	gorm.Model
    UserID int `json:"userid"`
    PostID int `json:"postid"`
	
}

type Exist struct{
	Exists bool 
	ID int
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Likes{})
}


func (liked_by *Likes) LikePost() (*Likes,Exist){
	var b Exist
	db.Raw(`SELECT
	id,
	EXISTS(
		SELECT
		likes.user_id,
		post_id,
		users.username
		FROM
		likes
		JOIN users ON users.id = likes.user_id
		WHERE
		likes.user_id = ?
		AND ? = likes.post_id
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