package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LandingPage(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"siteName": "Nexus Internet Kenya",
		"mission":  "To connect every home and business in Kenya with fast, reliable, and affordable internet.",
		"services": []string{"Internet cable installation", "Maintenance & Support"},
		"plans": []map[string]interface{}{
			{"name": "Weekly", "price": 500, "bandwidth": "10 Mbps", "duration": "week"},
			{"name": "Monthly", "price": 1800, "bandwidth": "25 Mbps", "duration": "month"},
			{"name": "Yearly", "price": 20000, "bandwidth": "50 Mbps", "duration": "year"},
		},
		"contact": map[string]string{
			"phone":   "+254 700 000000",
			"email":   "info@nexuskenya.co.ke",
			"address": "123 Nairobi Ave, Nairobi, Kenya",
		},
	})
}
