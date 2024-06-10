import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handlePurchase = async (cid) => {
        try {
            await axios.post(`http://localhost:5000/api/cart/purchase/${cid}`);
            fetchCartItems(); // Refresh the cart items after purchase
        } catch (error) {
            console.error('Error requesting purchase:', error);
        }
    };

    const handlePurchaseAll = async () => {
        try {
            await axios.post('http://localhost:5000/api/cart/purchaseAll');
            fetchCartItems(); // Refresh the cart items after purchase
        } catch (error) {
            console.error('Error requesting purchase for all items:', error);
        }
    };

    const handleDelete = async (cid) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${cid}`);
            fetchCartItems(); // Refresh the cart items after deletion
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity, 10) || 0;
            return total + itemPrice * itemQuantity;
        }, 0).toFixed(2);
    };

    return (
        <div>
            <h2>My Cart</h2>
            <table>
                <thead>
                <tr>
                    <th>CID</th>
                    <th>ISBN</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map(item => (
                    <tr key={item.CID}>
                        <td>{item.CID}</td>
                        <td>{item.ISBN}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price ? item.price.toFixed(2) : 'N/A'}</td>
                        <td>{item.price ? (item.price * item.quantity).toFixed(2) : 'N/A'}</td>
                        <td>
                            <button onClick={() => handlePurchase(item.CID)}>Request Purchase</button>
                            <button onClick={() => handleDelete(item.CID)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>Total Price: ${calculateTotalPrice()}</h3>
            <button onClick={handlePurchaseAll}>Request Purchase for All</button>
        </div>
    );
};

export default Cart;
