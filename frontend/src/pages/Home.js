import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '40vh', backgroundColor: '#48BB78' }}>
      <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to NUT-FIT</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '30px' }}>Start your journey to a healthier you.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link
            to="/login"
            style={{ backgroundColor: '#4299E1', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center', transition: 'background-color 0.3s ease-in-out' }}
          >
            User Login
          </Link>
          <Link
            to="/AdminLogin"
            style={{ backgroundColor: '#38A169', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center', transition: 'background-color 0.3s ease-in-out' }}
          >
            Admin Login
          </Link>
          <Link
            to="/register"
            style={{ backgroundColor: '#D97706', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center', transition: 'background-color 0.3s ease-in-out' }}
            
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
