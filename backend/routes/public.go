package routes

import (
	"nexus-internet-kenya-backend/controllers"

	"github.com/gin-gonic/gin"
)

func PublicRoutes(r *gin.Engine) {
	r.GET("/api/landing", controllers.LandingPage)
}
