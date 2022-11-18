package main

import (
	"github.com/labstack/echo/v4"
	"server/pkg/handlers"
	"github.com/labstack/echo/v4/middleware"

)

func main() {
	app := echo.New()

	 // Middleware
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())
   
	// Users Routes
	app.POST("/register",handlers.RegisterUser)
	app.POST("/login", handlers.LoginUser)
	app.GET("/users",handlers.GetAllUsers)
	app.GET("/user/:id",handlers.GetUserById)
	app.DELETE("/user/:id",handlers.DeleteUser)

	// Post Routes

	app.Logger.Fatal(app.Start(":8080"))
}