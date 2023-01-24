package main

import (
	"net/http"
	"server/pkg/handlers"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	app := echo.New()

	 // Middlewares
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	  }))

	app.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))
	app.Use(handlers.AuthMiddleware)

	app.Static("/", "static")	
   
	// Auth Routes
	app.POST("/register",handlers.RegisterUser)
	app.POST("/login", handlers.LoginUser)
	app.GET("/logout", handlers.Logout)

	// User Routes
	app.GET("/users",handlers.GetAllUsers)
	app.GET("/user/:id",handlers.GetUserByID)
	app.PATCH("/@me",handlers.UpdateUser)
	app.DELETE("/delete-user/:id",handlers.DeleteUser)

	// Post Routes
	app.POST("/add-post",handlers.AddPost)
	app.GET("/dashboard", handlers.GetAllPosts)
	app.GET("/thispost/:id", handlers.GetPostByID)
	app.POST("/like-post", handlers.LikePost)
	app.DELETE("/post/:id", handlers.DeletePost)
	app.PATCH("/@my-post/:id", handlers.EditPost)

	// Comment Routes
	app.POST("/add-comment",handlers.AddComment)
	app.GET("/get-comments/:id", handlers.GetCommentsByPosts)
	app.POST("/like-comment", handlers.LikeComment)
	app.DELETE("/comment/:id", handlers.DeleteComment)

	app.Logger.Fatal(app.Start(":8080"))
	
}