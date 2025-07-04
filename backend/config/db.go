package config

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"nexus-internet-kenya-backend/models"
)

var DB *gorm.DB

func InitDB() {
	dsn := os.Getenv("DATABASE_DSN")
	if dsn == "" {
		dsn = "host=localhost port=5432 user=postgres dbname=nexus_internet_kenya password=yourpassword sslmode=disable"
	}
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	// Auto-migrate models
	err = db.AutoMigrate(&models.User{}, &models.Plan{}, &models.Purchase{})
	if err != nil {
		log.Fatal("Failed to auto-migrate models:", err)
	}
	DB = db
}

func GetDB() *gorm.DB {
	return DB
}
