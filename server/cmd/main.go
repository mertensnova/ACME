package main

import (
	"server/pkg/handlers"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	app := echo.New()

	 // Middleware
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	  }))
	app.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))
	app.Use(handlers.AuthMiddleware)
	
   
	// Auth Routes
	app.POST("/register",handlers.RegisterUser)
	app.POST("/login", handlers.LoginUser)
	app.GET("/logout", handlers.Logout)
	app.GET("/users",handlers.GetAllUsers)
	app.GET("/user/:id",handlers.GetUserById)
	app.DELETE("/user/:id",handlers.DeleteUser)

	// Post Routes
	app.Logger.Fatal(app.Start(":8080"))
}