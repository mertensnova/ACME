package main

import (
	"github.com/labstack/echo/v4"
	"server/pkg/handlers"

)

func main() {
	app := echo.New()

	app.POST("/register",handlers.RegisterUser)
	app.GET("/users",handlers.GetAllUsers)
	app.GET("/user/:id",handlers.GetUserById)
	app.DELETE("/user/:id",handlers.DeleteUser)

	app.Logger.Fatal(app.Start(":8080"))
}