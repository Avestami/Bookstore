import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserPanel = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Error fetching books. Please try again later.');
        }
    };

    const handleQuantityChange = (ISBN, quantity) => {
        setCart({ ...cart, [ISBN]: quantity });
    };

    const addToCart = async (ISBN) => {
        const quantity = cart[ISBN] || 1;
        try {
            await axios.post('http://localhost:5000/api/cart', { ISBN, quantity });
            alert('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            setError('Error adding book to cart. Please try again later.');
        }
    };

    const creditBase = async () => {
        navigate('/creditUserBase');
    };

    const userProfileSettings = async () => {
        navigate('/userProfileSettings');
    };

    const logout = async () => {
        navigate('/login');
    };

    const viewCart = async () => {
        navigate('/Cart');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="userPanel-content">
                <p>Welcome to your Panel!</p>
                <button onClick={creditBase}>My Credit Cards</button>
                <button onClick={viewCart}>My Cart</button>
                <button onClick={userProfileSettings}>Profile Settings</button>
                <button onClick={logout}>Logout</button>
                {error && <div className="text-red-500">{error}</div>}
                <h3>Available Books</h3>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ISBN</th>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Author</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Quantity</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.ISBN}>
                            <td className="py-2 px-4 border-b">{book.ISBN}</td>
                            <td className="py-2 px-4 border-b">{book.title}</td>
                            <td className="py-2 px-4 border-b">{book.author}</td>
                            <td className="py-2 px-4 border-b">{book.price}</td>
                            <td className="py-2 px-4 border-b">
                                <input
                                    type="number"
                                    min="1"
                                    value={cart[book.ISBN] || 1}
                                    onChange={(e) => handleQuantityChange(book.ISBN, e.target.value)}
                                    className="border p-1"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => addToCart(book.ISBN)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPanel;
