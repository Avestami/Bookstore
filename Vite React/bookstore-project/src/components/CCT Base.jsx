import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CCTBase = () => {
    const [types, setTypes] = useState([]);
    const [newType, setNewType] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/CCTbase');
            setTypes(response.data);
        } catch (error) {
            console.error('Error fetching credit card types:', error);
            setError('Error fetching credit card types. Please try again later.');
        }
    };

    const handleNewTypeChange = (e) => {
        setNewType(e.target.value);
    };

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:5000/api/CCTbase', { type: newType });
            setNewType('');
            await fetchTypes();
        } catch (error) {
            console.error('Error adding credit card type:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/CCTbase/${id}`);
            await fetchTypes();
        } catch (error) {
            console.error('Error deleting credit card type:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Credit Card Types Management</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white mb-4">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">CCTID</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {types.map((type) => (
                    <tr key={type.CCTID}>
                        <td className="py-2 px-4     border-b">{type.CCTID}</td>
                        <td className="py-2 px-4 border-b">{type.card_type}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => handleDelete(type.CCTID)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <h2 className="text-xl font-bold mb-2">Add New Credit Card Type</h2>
                <input
                    type="text"
                    value={newType}
                    onChange={handleNewTypeChange}
                    className="border p-2 mb-2"
                    placeholder="Enter new credit card type"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Type
                </button>
            </div>
        </div>
    );
};

export default CCTBase;
