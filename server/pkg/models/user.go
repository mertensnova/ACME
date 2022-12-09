package models

import (
	"server/pkg/config"

	"gorm.io/gorm"
)

var db *gorm.DB

type Users struct{
	gorm.Model
	ID int           `gorm:"primaryKey;autoIncrement"`
	Fullname string `form:"Fullname" json:"fullname"`
    Username string `gorm:"unique" form:"Username" json:"username"`
    Password string `form:"Password" json:"password"`
    Email    string  `gorm:"unique" form:"Email" json:"email"`
	Profile string 	`form:"Image" json:"image"`
	Posts []Posts  	`gorm:"foreignKey:UserID;references:ID"`
	LikedPosts []Likes `gorm:"foreignKey:PostID;references:ID"`
}

func init()  {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Users{})
}

func (user *Users) RegisterUser() *Users{
	db.Create(&user) 
	return user
}

func (u *Users) LoginUser() *Users{
	db.First(&u, "username = ?", u.Username)
	return u
}

func GetAllUsers() []Users{
	var Users []Users
	db.Find(&Users)
    return Users
}

func GetPostsOfUser(id uint64) ([]Result,[]Result){
	var posts []Result
	var liked_posts []Result
	db.Raw("SELECT posts.id,fullname,username,content,email,profile,likes,user_id from posts JOIN users ON posts.user_id = users.id WHERE users.id = ?",id).Scan(&posts)
	db.Raw("SELECT * from posts JOIN likes ON posts.id = likes.post_id JOIN users ON posts.user_id = users.id WHERE likes.user_id = ?",id).Scan(&liked_posts)
	return posts ,liked_posts
}

func (user *Users) UpdateUser() *Users {
	db.Model(&user).Where("ID = ?",user.ID).Updates(Users{Fullname: user.Fullname, Username:user.Username})
	return user
}

func DeleteUser(id string) Users{
    var deleteUser Users
	db.Unscoped().Delete(&Users{}, id)
	return deleteUser
}