
// ========================================
// WILCOX SCHOOL - SMART SCHOOL 360
// Main Backend Server
// ========================================

// Import required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

// Create Express application
const app = express();

// Set server port
const PORT = 3000;


// ========================================
// DATABASE CONFIGURATION
// ========================================

// Create database folder if it doesn't exist
const databaseFolder = path.join(__dirname, "database");

if (!fs.existsSync(databaseFolder)) {
    fs.mkdirSync(databaseFolder);
}

// Connect to SQLite database
const db = new Database(
    path.join(databaseFolder, "wilcox_school.db")
);

// Enable foreign key support
db.pragma("foreign_keys = ON");

// Create initial users table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL
            CHECK(role IN ('admin', 'student')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

console.log("Database connected successfully!");


// ========================================
// MIDDLEWARE
// ========================================

// Allow the server to receive JSON data
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));


// ========================================
// API ROUTES
// ========================================

// Welcome route
app.get("/api", (req, res) => {

    res.json({
        message: "Welcome to Wilcox School SMART SCHOOL 360 API",
        status: "Backend is running successfully"
    });

});


// Health check route
app.get("/api/health", (req, res) => {

    res.json({
        status: "OK",
        database: "Connected",
        school: "Wilcox School"
    });

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("WILCOX SCHOOL BACKEND STARTED");
    console.log("--------------------------------");
    console.log(`Server: http://localhost:${PORT}`);
    console.log("Database: Connected");
    console.log("Status: Running");

});
