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
	// app.Use(handlers.AuthMiddleware)

	app.Static("/", "static")	
	// app.Use(middleware.Static("/server/static"))
	
   
	// Auth Routes
	app.POST("/register",handlers.RegisterUser)
	app.POST("/login", handlers.LoginUser)
	// app.PATCH("/passwd-recent")
	app.GET("/logout", handlers.Logout)

	// User Routes
	app.GET("/users",handlers.GetAllUsers)
	app.GET("/user/:id",handlers.GetPostsOfUser)
	app.PATCH("/@me",handlers.UpdateUser)
	app.DELETE("/delete-user/:id",handlers.DeleteUser)

	// Post Routes
	app.POST("/add-post",handlers.AddPost)
	app.GET("/dashboard", handlers.GetAllPosts)
	app.POST("/like-post", handlers.LikePost)
	// app.DELETE("/post/:id", handlers.DeletePost)
	app.PATCH("/@my-post", handlers.EditPost)

	app.Logger.Fatal(app.Start(":8080"))
	
}