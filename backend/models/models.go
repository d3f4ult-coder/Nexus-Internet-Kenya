package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"-"`
	Role     string `json:"role" gorm:"default:user"` // user or admin
}

type Plan struct {
	gorm.Model
	Name      string  `json:"name"`
	Bandwidth string  `json:"bandwidth"`
	Price     float64 `json:"price"`
	Duration  string  `json:"duration"` // weekly, monthly, yearly
}

type Purchase struct {
	gorm.Model
	UserID uint
	PlanID uint
	Amount float64
	Status string // paid, pending
}
