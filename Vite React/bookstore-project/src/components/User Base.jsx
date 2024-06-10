import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBase = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/userBase');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${id}`, editingUser);
            setEditingUser(null);
            await fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">UID</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">City</th>
                    <th className="py-2 px-4 border-b">Address</th>
                    <th className="py-2 px-4 border-b">Zipcode</th>
                    <th className="py-2 px-4 border-b">District</th>
                    <th className="py-2 px-4 border-b">CCID</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.UID}>
                        <td className="py-2 px-4 border-b">{user.UID}</td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="first_name" value={editingUser.first_name} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.first_name
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="last_name" value={editingUser.last_name} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.last_name
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="city" value={editingUser.city} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.city
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="address" value={editingUser.address} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.address
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="zipcode" value={editingUser.zipcode} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.zipcode
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="district" value={editingUser.district} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.district
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <input type="text" name="ccid" value={editingUser.ccid} onChange={handleEditChange} className="border p-1" />
                            ) : (
                                user.ccid
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingUser && editingUser.UID === user.UID ? (
                                <button onClick={() => handleSave(user.UID)} className="bg-blue-500 text-white px-2 py-1 rounded">Apply</button>
                            ) : (
                                <button onClick={() => setEditingUser(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                            )}
                            <button onClick={() => handleDelete(user.UID)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserBase;
