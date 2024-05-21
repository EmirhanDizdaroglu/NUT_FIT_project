import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPanel = () => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    Weight: '',
    Height: '',
    aim: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/userProfile', {
          withCredentials: true
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/userProfile', user, {
        withCredentials: true
      });

      if (response.status === 200) {
        alert('Profile updated successfully.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '32px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
          }}
        >
          User Panel
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={user.surname}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="number"
            name="Weight"
            placeholder="Weight"
            value={user.Weight}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="number"
            name="Height"
            placeholder="Height"
            value={user.Height}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="text"
            name="aim"
            placeholder="Aim"
            value={user.aim}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              color: 'white',
              backgroundColor: 'blue',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPanel;
