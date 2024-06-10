const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const {json} = require("body-parser");
const app = express()
const PORT = process.env.PORT || 5000;



require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
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
app.use(json());

let UID = null
//LOGIN
app.post('/login', (req, res) => {
    const sqlAdmin = "SELECT * FROM admin WHERE AID = ? AND password = ?";
    const adminValues = [
        req.body.UID,
        req.body.password
    ];
    db.query(sqlAdmin, adminValues, (adminErr, adminResult) => {
        if (adminErr) {
            console.error('Error executing SQL query for admin login:', adminErr);
            return res.status(500).json({ message: "Admin Login Failed" });
        }
        if (adminResult.length > 0) {
            console.log("`",AID,"`", " Logged in as Admin");
            return res.status(200).json({ message: "Admin Login Successful", role: "admin" });
        } else {
            const sqlUser = "SELECT * FROM registered_user WHERE UID = ? AND password = ?";
            const userValues = [
                req.body.UID,
                req.body.password
            ];

            db.query(sqlUser, userValues, (userErr, userResult) => {
                console.log("admin not found checking user")
                if (userErr) {
                    console.error('Error executing SQL query for user login:', userErr);
                    return res.status(500).json({ message: "User Login Failed" });
                }

                if (userResult.length > 0) {
                    UID = req.body.UID;
                    console.log("`",UID,"`", " Logged in as User");
                    return res.status(200).json({ message: "User Login Successful", role: "user" });
                } else {
                    return res.status(401).json({ message: "Invalid username or password" });
                }
            });
        }
    });
});




//SIGN UP
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO registered_user (UID, password, first_name, last_name, city, address, zipcode, district, ccid, isUnregistered) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.UID,
        req.body.password,
        req.body.first_name,
        req.body.last_name,
        req.body.city,
        req.body.address,
        req.body.zipcode,
        req.body.district, // Added district here
        1, // Hardcoded cctid as 0 temporarily, needs debugging
        0
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


// In server.js or your Express server file
app.get('/api/userBase', (req, res) => {
    db.query('SELECT * FROM registered_user', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//user base
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const { password, first_name, last_name, city, address, zipcode, district, ccid, isUnregistered } = req.body;
    console.log(req.body)
    const sql = 'UPDATE registered_user SET password = ?, first_name = ?, last_name = ?, city = ?, address = ?, zipcode = ?, district = ?, ccid = ?, isUnregistered = ? WHERE UID = ?';
    db.query(sql, [password, first_name, last_name, city, address, zipcode, district, 0, isUnregistered, id], (err, results) => {
        if (err) {
            console.log(sql)
            console.log(password, first_name, last_name, city, address, zipcode, district, ccid, isUnregistered, id)
            return res.status(500).json({ error: err.message });

        }
        res.json({ message: 'User updated successfully' });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM registered_user WHERE UID = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deleted successfully' });
    });
});



//purchase base
app.get('/api/purchases', (req, res) => {
    const sql = 'SELECT * FROM purchase_record';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.put('/api/purchases/:id/accept', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const sql = 'UPDATE purchase_record SET isAccepted = 1 WHERE PID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Purchase accepted' });
    });
});

app.put('/api/purchases/acceptAll', (req, res) => {
    const sql = 'UPDATE purchase_record SET isAccepted = 1 WHERE isAccepted != 1';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'All purchases accepted' });
    });
});



//credit base
app.get('/api/CCTbase', (req, res) => {
    const sql = 'SELECT * FROM credit_card_type';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/api/CCTbase', (req, res) => {
    const { type } = req.body;

    // Step 1: Find the highest CCTID
    const findMaxCCTIDSql = 'SELECT MAX(CCTID) as maxCCTID FROM credit_card_type';
    db.query(findMaxCCTIDSql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const maxCCTID = result[0].maxCCTID || 0; // if no records, start from 0
        const newCCTID = maxCCTID + 1;

        // Step 2: Insert new credit card type with the new CCTID
        const insertSql = 'INSERT INTO credit_card_type (CCTID, card_type) VALUES (?, ?)';
        db.query(insertSql, [newCCTID, type], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Credit card type added successfully', id: newCCTID });
        });
    });
});


app.delete('/api/CCTbase/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM credit_card_type WHERE CCTID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Credit card type deleted successfully' });
    });
});


//category base
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
app.post('/api/categories', (req, res) => {
    const { category_name } = req.body;
    const getMaxIdSql = 'SELECT MAX(CATID) AS maxId FROM category';

    db.query(getMaxIdSql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const maxId = result[0].maxId || 0;
        const newCatId = maxId + 1;

        const insertSql = 'INSERT INTO category (CATID, category_name) VALUES (?, ?)';
        db.query(insertSql, [newCatId, category_name], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Category added successfully', id: result.insertId });
        });
    });
});
app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM category WHERE CATID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Category deleted successfully' });
    });
});


//books base
app.get('/api/books', (req, res) => {
    const sql = 'SELECT * FROM book WHERE isDeleted = 0';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
app.post('/api/books', (req, res) => {
    const { publisher, author, price, review, published_year, least_available_quantity, available_quantity, CATID } = req.body;
    const findMaxISBN = 'SELECT MAX(ISBN) AS maxISBN FROM book';
    db.query(findMaxISBN, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const newISBN = result[0].maxISBN + 1;
        const sql = `INSERT INTO book (ISBN, publisher, author, price, review, published_year, least_available_quantity, available_quantity, isDeleted, CATID) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)`;
        db.query(sql, [newISBN, publisher, author, price, review, published_year, least_available_quantity, available_quantity, CATID], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Book added successfully', id: result.insertId });
        });
    });
});

app.put('/api/books/:ISBN', (req, res) => {
    const { ISBN } = req.params;
    const { publisher, author, price, review, published_year, least_available_quantity, available_quantity, CATID } = req.body;
    const sql = `UPDATE book SET publisher = ?, author = ?, price = ?, review = ?, published_year = ?, least_available_quantity = ?, available_quantity = ?, CATID = ? WHERE ISBN = ? AND isDeleted = 0`;
    db.query(sql, [publisher, author, price, review, published_year, least_available_quantity, available_quantity, CATID, ISBN], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book updated successfully' });
    });
});
app.delete('/api/books/:ISBN', (req, res) => {
    const { ISBN } = req.params;
    const sql = 'UPDATE book SET isDeleted = 1 WHERE ISBN = ?';
    db.query(sql, [ISBN], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});
//user panel



//dashboard
// Fetch all books
app.get('/api/books', (req, res) => {
    const sql = 'SELECT * FROM book WHERE isDeleted = 0';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add book to cart
app.post('/api/cart', (req, res) => {
    const { ISBN, quantity } = req.body;
    // Check if the book exists in the database
    const checkBookQuery = 'SELECT * FROM book WHERE ISBN = ?';
    db.query(checkBookQuery, [ISBN], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error checking book availability' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Find the highest CID in the cart
        const getMaxCidQuery = 'SELECT MAX(CID) as maxCID FROM cart';
        db.query(getMaxCidQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching max CID' });
            }
            const maxCID = result[0].maxCID || 0;
            const newCID = maxCID + 1;

            // Insert the book into the user's cart
            const insertCartQuery = 'INSERT INTO cart (CID, UID, ISBN, UUID, quantity) VALUES (?, ?, ?, ?, ?)';
            db.query(insertCartQuery, [newCID, UID, ISBN, 0, quantity], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Error adding book to cart' });
                }
                res.json({ message: 'Book added to cart successfully' });
            });
        });
    });
});
//cart
// Fetch cart items for a user
app.get('/api/cart', (req, res) => {
    const sql = 'SELECT * FROM cart WHERE UID = ? AND UUID = 0'; // Fetch items that are not yet purchased
    db.query(sql, [UID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Helper function to get the next PID
const getNextPID = (callback) => {
    const sql = 'SELECT MAX(PID) as maxPID FROM purchase_record';
    db.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            const maxPID = result[0].maxPID || 0;
            callback(null, maxPID + 1);
        }
    });
};

// Request purchase for a specific cart item
app.post('/api/cart/purchase/:cid', (req, res) => {
    const CID = req.params.cid;
    const AID = 1; // Hardcoded admin ID
    const purchase_desc = "Book Purchase Request";
    const isAccepted = 0;

    getNextPID((err, nextPID) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting next PID' });
        }

        const insertPurchaseQuery = 'INSERT INTO purchase_record (PID, AID, CID, UID, purchase_desc, isAccepted) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertPurchaseQuery, [nextPID, AID, CID, UID, purchase_desc, isAccepted], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error creating purchase record' });
            }
            res.json({ message: 'Purchase requested successfully' });
        });
    });
});

// Request purchase for all cart items
app.post('/api/cart/purchaseAll', (req, res) => {
    const AID = 1; // Hardcoded admin ID
    const purchase_desc = "Book Purchase Request";
    const isAccepted = 0;

    // Get all cart items for the user
    const getCartItemsQuery = 'SELECT CID FROM cart WHERE UID = ? AND UUID = 0';
    console.log(UID)
    db.query(getCartItemsQuery, [UID], (err, cartItems) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting cart items' });
        }

        const insertPurchaseRecords = (index) => {
            if (index >= cartItems.length) {
                return res.json({ message: 'Purchase requested for all items successfully' });
            }

            const CID = cartItems[index].CID;

            getNextPID((err, nextPID) => {
                if (err) {
                    return res.status(500).json({ error: 'Error getting next PID' });
                }

                const insertPurchaseQuery = 'INSERT INTO purchase_record (PID, AID, CID, UID, purchase_desc, isAccepted) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(insertPurchaseQuery, [nextPID, AID, CID, UID, purchase_desc, isAccepted], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error creating purchase record' });
                    }
                    insertPurchaseRecords(index + 1);
                });
            });
        };

        insertPurchaseRecords(0);
    });
});
app.get('/api/cart', (req, res) => {

    const sql = `
        SELECT cart.CID, cart.ISBN, cart.quantity, book.price 
        FROM cart 
        JOIN book ON cart.ISBN = book.ISBN 
        WHERE cart.UID = ? AND cart.UUID = 0`;

    db.query(sql, [UID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching cart items' });
        }
        res.json(results);
    });
});
// Delete a cart item
app.delete('/api/cart/:cid', (req, res) => {
    const CID = req.params.cid;
    const sql = 'DELETE FROM cart WHERE CID = ? AND UID = ?';
    db.query(sql, [CID, UID], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting cart item' });
        }
        res.json({ message: 'Cart item deleted successfully' });
    });
});
app.listen(PORT, ()=>{
    console.log(`server running on port${PORT}`)
})