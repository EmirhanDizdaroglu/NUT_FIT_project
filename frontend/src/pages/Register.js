import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'; // CSS dosyasını ekleyin

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    nickname: '',
    Height: '', // 'height' yerine 'Height'
    Weight: '', // 'weight' yerine 'Weight'
    email: '',
    phoneNumber: '',
    password: '',
    aim: '',
  });
  const aimOptions = ['Loss Weight', 'Stay Fit', 'Gain Weight'];
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.Height && user.Weight) {
      const heightInMeters = user.Height / 100; // 'user.height' yerine 'user.Height'
      const calculatedBmi = (user.Weight / (heightInMeters * heightInMeters)).toFixed(2); // 'user.weight' yerine 'user.Weight'
      setBmi(calculatedBmi);
    }
  }, [user.Height, user.Weight]); // 'user.Height' ve 'user.Weight' doğru kullanıldı

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...user,
      bmi: bmi // Ensure BMI is included in the user data sent to the backend
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true // CORS sorununu önlemek için oturum bilgilerini taşı
        }
      );

      if (response.status === 201) {
        setSuccess('Registration successful!');
        navigate('/login'); // '/Login' yerine '/login'
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
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
        backgroundColor: '#f0f0f0', // Hafif arka plan rengi
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '32px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px', // Yuvarlatılmış köşeler
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px', // Başlık alt boşluğu
          }}
        >
          Register
        </h1>
        {error && (
          <div
            style={{
              color: 'red',
              marginBottom: '16px', // Hatalar için kırmızı
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: 'green',
              marginBottom: '16px', // Başarı için yeşil
            }}
          >
            {success}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px', // Inputlar arası boşluk
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            style={{
              padding: '10px', // İç dolgu
              border: '1px solid #ccc', // İnce çerçeve
              borderRadius: '4px', // Yuvarlatılmış köşeler
            }}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={user.surname}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px', // Alt boşluk
            }}
          />
          <input
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={user.nickname}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <input
            type="number"
            name="Height" // 'height' yerine 'Height'
            placeholder="Height (cm)"
            value={user.Height}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px', // Alt boşluk
            }}
          />
          <input
            type="number"
            name="Weight" // 'weight' yerine 'Weight'
            placeholder="Weight (kg)"
            value={user.Weight}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px', // Alt boşluk
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px', 
              marginBottom: '16px', 
            }}
          />
          <select
            type="text"
            name="aim"
            placeholder="Aim"
            value={user.aim}
            onChange={handleChange}
            style={{
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              marginBottom: '16px', 
            }}
          >
           <option value="">Select aim...</option>
  {aimOptions.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ))}
</select>
          <div>
            <strong>BMI: </strong> {bmi ? bmi : 'Enter height and weight to calculate'}
          </div>
          <button
            type="submit"
            style={{
              padding: '12px',
              color: 'white',
              backgroundColor: 'blue',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'darkblue';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'blue';
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
