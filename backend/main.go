package main

import (
	"nexus-internet-kenya-backend/controllers"
	"nexus-internet-kenya-backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/api/landing", controllers.LandingPage)

	routes.PublicRoutes(r)

	// Auth routes

	// User dashboard routes

	// Admin routes

	r.Run(":8080")
}
