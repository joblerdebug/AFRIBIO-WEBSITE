const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', // your MySQL username
    password: '1234', // your MySQL password
    database: 'school_enquiries'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log('Database connection failed: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API endpoint for form submission
app.post('/submit-enquiry', (req, res) => {
    const { 
        schoolName, 
        contactName, 
        email, 
        location, 
        contactNumber, 
        studentPopulation, 
        message 
    } = req.body;
    
    const sql = `INSERT INTO enquiries 
        (school_name, contact_name, email, location, contact_number, student_population, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [
        schoolName, 
        contactName, 
        email, 
        location, 
        contactNumber, 
        studentPopulation, 
        message
    ], (err, result) => {
        if (err) {
            console.log('Database error:', err);
            res.status(500).json({ 
                success: false, 
                message: 'Error saving enquiry' 
            });
        } else {
            res.status(200).json({ 
                success: true, 
                message: 'Enquiry submitted successfully!' 
            });
        }
    });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// cv form
// Add these packages for file upload handling
const multer = require('multer');
const path = require('path');

// Configure file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Create this folder in your backend
    },
    filename: function (req, file, cb) {
        // Create unique filename: timestamp-originalname
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        // Allow only PDF and Word documents
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(fileExt)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
        }
    }
});

// Create uploads folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// CV Submission Route - ADD THIS TO YOUR server.js
app.post('/submit-cv', upload.single('cvFile'), (req, res) => {
    const { fullName, email, phone, position, message } = req.body;
    
    console.log('📄 CV Application received:', { fullName, email, phone, position });
    
    const sql = `INSERT INTO job_applications 
        (full_name, email, phone, position, cv_filename, message) 
        VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [
        fullName, 
        email, 
        phone, 
        position, 
        req.file ? req.file.filename : null, 
        message
    ], (err, result) => {
        if (err) {
            console.log('Database error:', err);
            res.status(500).json({ 
                success: false, 
                message: 'Error saving application' 
            });
        } else {
            console.log('✅ CV Application saved! ID:', result.insertId);
            res.status(200).json({ 
                success: true, 
                message: 'CV submitted successfully!' 
            });
        }
    });
});

// Route to serve uploaded files (for viewing later)
app.use('/uploads', express.static('uploads'));