import React, { useState } from 'react';
import axios from 'axios';

const EditUserModal = ({ user, onUpdate, onClose }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.contact);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contact', contact);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            await axios.put(`http://localhost:5000/users/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(); // Trigger update of user list
            alert('User updated successfully!');
            onClose(); // Close the modal
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 px-3 py-2 border border-gray-300 rounded-md w-full" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 px-3 py-2 border border-gray-300 rounded-md w-full" required />
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className="mb-2 px-3 py-2 border border-gray-300 rounded-md w-full" required />
                    <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} className="mb-2" />
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">Update</button>
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
