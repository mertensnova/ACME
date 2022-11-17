package config

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
  )
  

var (
	db * gorm.DB
)

func Connect()  {

	dsn := "host=containers-us-west-123.railway.app user=postgres password=zucMHo0h1izZ6tBq6WkS dbname=railway port=6256 sslmode=disable"
	d, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	db = d 
}

func GetDB() *gorm.DB{
	return db
}