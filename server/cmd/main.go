package main

import (
	"server/pkg/handlers"

	"github.com/labstack/echo/v4"
	// "github.com/gorilla/sessions"
	// "github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	app := echo.New()

	 // Middleware
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	// app.Use(middleware.CORS())
	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		// AllowOrigins: []string{"http://localhost:3000","http://localhost:8080"},
		// AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	  }))
	// app.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))
	
   
	// Users Routes
	// app.GET("/", handlers.Logout)
	app.POST("/register",handlers.RegisterUser)
	app.POST("/login", handlers.LoginUser)
	app.GET("/logout", handlers.Logout)
	app.GET("/dashboard", handlers.CheckAuth)
	app.GET("/users",handlers.GetAllUsers)
	app.GET("/user/:id",handlers.GetUserById)
	app.DELETE("/user/:id",handlers.DeleteUser)

	// Post Routes
	app.Logger.Fatal(app.Start(":8080"))
}