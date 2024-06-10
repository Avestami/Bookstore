import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookBase = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        publisher: '',
        author: '',
        price: '',
        review: '',
        published_year: '',
        least_available_quantity: '',
        available_quantity: '',
        CATID: ''
    });
    const [editingBook, setEditingBook] = useState(null);
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

    const handleNewBookChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingBook({ ...editingBook, [name]: value });
    };

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:5000/api/books', newBook);
            setNewBook({
                publisher: '',
                author: '',
                price: '',
                review: '',
                published_year: '',
                least_available_quantity: '',
                available_quantity: '',
                CATID: ''
            });
            await fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
            setError('Error adding book. Please try again later.');
        }
    };

    const handleSave = async (ISBN) => {
        try {
            await axios.put(`http://localhost:5000/api/books/${ISBN}`, editingBook);
            setEditingBook(null);
            await fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Error updating book. Please try again later.');
        }
    };

    const handleDelete = async (ISBN) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${ISBN}`);
            await fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
            setError('Error deleting book. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Book Management</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <h2 className="text-xl font-bold">Add New Book</h2>
                <input type="text" name="publisher" placeholder="Publisher" value={newBook.publisher} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="number" name="price" placeholder="Price" value={newBook.price} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="text" name="review" placeholder="Review" value={newBook.review} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="number" name="published_year" placeholder="Published Year" value={newBook.published_year} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="number" name="least_available_quantity" placeholder="Least Available Quantity" value={newBook.least_available_quantity} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="number" name="available_quantity" placeholder="Available Quantity" value={newBook.available_quantity} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <input type="text" name="CATID" placeholder="Category ID" value={newBook.CATID} onChange={handleNewBookChange} className="border p-2 mr-2" />
                <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ISBN</th>
                    <th className="py-2 px-4 border-b">Publisher</th>
                    <th className="py-2 px-4 border-b">Author</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Review</th>
                    <th className="py-2 px-4 border-b">Published Year</th>
                    <th className="py-2 px-4 border-b">Least Available Quantity</th>
                    <th className="py-2 px-4 border-b">Available Quantity</th>
                    <th className="py-2 px-4 border-b">Category ID</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.ISBN}>
                        <td className="py-2 px-4 border-b">{book.ISBN}</td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="text" name="publisher" value={editingBook.publisher} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.publisher
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="text" name="author" value={editingBook.author} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.author
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="number" name="price" value={editingBook.price} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.price
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="text" name="review" value={editingBook.review} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.review
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="number" name="published_year" value={editingBook.published_year} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.published_year
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="number" name="least_available_quantity" value={editingBook.least_available_quantity} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.least_available_quantity
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="number" name="available_quantity" value={editingBook.available_quantity} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.available_quantity
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <input type="text" name="CATID" value={editingBook.CATID} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                book.CATID
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingBook && editingBook.ISBN === book.ISBN ? (
                                <button onClick={() => handleSave(book.ISBN)} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                            ) : (
                                <button onClick={() => setEditingBook(book)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                            )}
                            <button onClick={() => handleDelete(book.ISBN)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookBase;
