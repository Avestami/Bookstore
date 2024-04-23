const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "bookstore"
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
});
app.use(cors())
app.use(express.json());

// define routes and backend logic
app.get('/', (re, res)=>{
    return res.json("From Backend")
})




//LOGIN
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM registered_user WHERE UID = ? AND password = ?";
    const values = [
        req.body.UID,
        req.body.password
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: "Login Failed" });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: "Login Successful" });
        } else {
            return res.status(401).json({ message: "Invalid username or password" });
        }
    });
});




//SIGN UP
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO registered_user (UID, password, first_name, last_name, city, address, zipcode, district, cctid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.UID,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
        req.body.city,
        req.body.address,
        req.body.zipcode,
        req.body.district, // Added district here
        0 // Hardcoded cctid as 0
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: "Sign up Failed" });
        }
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Signup Successful" });
        } else {
            return res.status(401).json({ message: "Signup Failed" });
        }
    });
});


app.listen(PORT, ()=>{
    console.log(`server running on port${PORT}`)
})