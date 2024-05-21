import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

function AP_UserList() {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/userList`, { withCredentials: true });
            setUsers(response.data);
            setAllUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterUsers(e.target.value);
    };

    const filterUsers = (term) => {
        const lowercasedTerm = term.toLowerCase();
        const filteredUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(lowercasedTerm) ||
            user.surname.toLowerCase().includes(lowercasedTerm)
        );
        setUsers(filteredUsers);
    };

    const submitUser = async (e) => {
        e.preventDefault();
        if (editingUser) {
            const url = `http://localhost:5000/api/user/${editingUser._id}`;
            try {
                const response = await axios.put(url, formData, { withCredentials: true });
                const updatedUsers = users.map(user => user._id === editingUser._id ? response.data : user);
                setUsers(updatedUsers);
                setEditingUser(null);
                setFormData({ name: '', surname: '', email: '', phoneNumber: '' }); // Reset form data
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData(user);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/user/${userId}`, { withCredentials: true });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            <h1>Admin Panel</h1>
            <h2>User List</h2>
            <form onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search by name or surname"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </form>
            {editingUser && (
                <form onSubmit={submitUser}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleFormChange}
                        placeholder="Surname"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        placeholder="Phone Number"
                    />
                    <button type="submit">Update User</button>
                </form>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(user)}>Update</button>
                                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AP_UserList;