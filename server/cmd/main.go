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
	app.POST("https://social-media-amr8644.vercel.app/register",handlers.RegisterUser)
	app.POST("https://social-media-amr8644.vercel.app/login", handlers.LoginUser)
	app.GET("https://social-media-amr8644.vercel.app/logout", handlers.Logout)
	app.GET("https://social-media-amr8644.vercel.app/users",handlers.GetAllUsers)
	app.GET("https://social-media-amr8644.vercel.app/user/:id",handlers.GetUserById)
	app.DELETE("https://social-media-amr8644.vercel.app/user/:id",handlers.DeleteUser)

	// Post Routes
	app.POST("https://social-media-amr8644.vercel.app/add-post",handlers.AddPost)
	app.GET("https://social-media-amr8644.vercel.app/dashboard", handlers.GetAllPosts)
	// app.GET("/getposts", handlers.Logout)

	app.Logger.Fatal(app.Start(":8080"))
	
}