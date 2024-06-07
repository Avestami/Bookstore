import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    // const [loading, setLoading] = useState(true);
    // const [isAdmin, setIsAdmin] = useState(false);
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     const checkAdminRole = async () => {
    //         try {
    //             // Perform an authenticated API request to check the user's role
    //             const response = await axios.get('http://localhost:5000/checkAdminRole');
    //             if (response.data.role === 'admin') {
    //                 setIsAdmin(true);
    //                 setLoading(false);
    //             } else {
    //                 navigate('/login'); // Redirect to dashboard if not admin
    //             }
    //         } catch (error) {
    //             console.error('Error checking admin role:', error);
    //             navigate('/login'); // Redirect to login page on error
    //         }
    //     };
    //
    //     checkAdminRole();
    // }, [navigate]);
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!isAdmin) {
    //     return null; // Render nothing if not admin (can also show a message)
    // }

    // Render the admin panel content
    return (
        <div>
            <h1>Admin Panel</h1>
            {/* Admin panel content */}
        </div>
    );
};

export default AdminPanel;
