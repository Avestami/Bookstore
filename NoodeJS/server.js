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

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [
        req.body.username,
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

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const values = [
        req.body.username,
        req.body.password
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