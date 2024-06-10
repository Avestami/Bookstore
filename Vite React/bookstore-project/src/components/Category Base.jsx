import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryBase = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Error fetching categories. Please try again later.');
        }
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:5000/api/categories', { category_name: newCategory });
            setNewCategory('');
            await fetchCategories();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            await fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="min-w-full bg-white mb-4">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">CATID</th>
                    <th className="py-2 px-4 border-b">Category Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.CATID}>
                        <td className="py-2 px-4 border-b">{category.CATID}</td>
                        <td className="py-2 px-4 border-b">{category.category_name}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => handleDelete(category.CATID)}
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
                <h2 className="text-xl font-bold mb-2">Add New Category</h2>
                <input
                    type="text"
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                    className="border p-2 mb-2"
                    placeholder="Enter new category"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add Category
                </button>
            </div>
        </div>
    );
};

export default CategoryBase;
