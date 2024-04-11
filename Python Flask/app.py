# app.py
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    port=3307,
    user="root",
    password="",
    database="bookstore"
)

# Define route to render the main page
@app.route('/')
def main_page():
    return render_template('index.html')

# Define route to render the login page
@app.route('/login')
def login_page():
    return render_template('login.html')

# Define route to render the signup page
@app.route('/signup')
def signup_page():
    return render_template('signup.html')

# Define endpoint for login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Example: Query the database to check login credentials
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        # Return some data, like user information or a token
        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# Define endpoint for signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Example: Insert new user into the database
    cursor = db.cursor()
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
    db.commit()
    cursor.close()

    return jsonify({'message': 'Signup successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
