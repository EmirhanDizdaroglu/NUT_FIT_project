import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting credentials:', credentials); // Gönderilen veriyi logla
      const response = await axios.post(
        'http://localhost:5000/api/login', 
        credentials,
        { withCredentials: true } // Oturum bilgilerini taşı
      );

      if (response.status === 200) {
        const userName = response.data.userName; // Gelen yanıttan kullanıcı adını al
        navigate('/userPanel', { state: { userName } }); // Kullanıcı adını state olarak gönder
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.status === 400) {
        alert('Invalid email or password.');
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

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
          Login Page
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
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
