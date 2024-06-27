import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal'; // Import the modal component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null); // State to track which user is being edited
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [editUserId]); // Trigger fetchUsers when editUserId changes

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
            alert('User deleted successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (id) => {
        setEditUserId(id);
        setModalOpen(true); // Open the modal
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
        setModalOpen(false); // Close the modal
    };

    const handleUpdateUser = () => {
        setEditUserId(null);
        setModalOpen(false); // Close the modal and trigger fetchUsers through useEffect
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Registered Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id} className="mb-4">
                        <div className='text-blue-600'>
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div className='text-blue-600'>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div className='text-blue-600'>
                            <strong>Contact:</strong> {user.contact}
                        </div>
                        <div className='text-blue-600'>
                            <strong>Profile Picture:</strong> {user.profilePicture}
                        </div>
                        <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2 mt-2">Delete</button>
                        <button onClick={() => handleEdit(user._id)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2">Edit</button>
                    </li>
                ))}
            </ul>
            {modalOpen && editUserId && (
                <EditUserModal
                    user={users.find(user => user._id === editUserId)}
                    onUpdate={handleUpdateUser}
                    onClose={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default UserList;
