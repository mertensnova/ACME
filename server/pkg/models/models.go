package models

import (
	"server/pkg/config"
	"gorm.io/gorm"
)

var db *gorm.DB

type Users struct{
	gorm.Model
    Username string `json:"username"`
    Password string `json:"password"`
    Email    string  `json:"email"`
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

func GetAllUsers() []Users{
	var Users []Users
	db.Find(&Users)
    return Users
}

func GetUserById(id string) (*Users,*gorm.DB){
    var getUser Users
	db := db.Where("ID=?",id).Find(&getUser)
	return &getUser,db
}

func DeleteUser(id string) Users{
    var deleteUser Users
	db.Unscoped().Delete(&Users{}, id)
	return deleteUser
}