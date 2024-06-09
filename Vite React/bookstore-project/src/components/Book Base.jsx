import React from 'react';
import BookCategories from "./BookCategories.jsx";

const BookBase = () => {
    return (
        <div>
            <div className="bookBase-content">
                <h1>Book Base</h1>
                <p>Welcome to the Book Base!</p>
                <button>Add Book</button>
                <button>Remove Book</button>
                <button>Edit Book Info</button>
                <button>Order Book</button>
            </div>
        </div>
    );
};

export default BookBase;