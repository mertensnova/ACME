package config

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)
  

var (
	db * gorm.DB
)

func Connect()  {

	dsn := "user=postgres password=bSHNLx5YqiMaOzuo host=db.wegkjexhqkunpdcjncex.supabase.co port=5432 dbname=postgres"
	d, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt: true,
	})

	if err != nil {
		panic(err)
	}
	db = d 
}

func GetDB() *gorm.DB{
	return db
}