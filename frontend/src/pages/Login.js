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
    e.preventDefault(); // Formun otomatik olarak yeniden yüklenmesini önler
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login', // Doğru endpoint login
        credentials
      );

      if (response.status === 200) { // Başarılı giriş durumunda
        const authToken = response.data.token; // Token alınıyor mu kontrol edin
        localStorage.setItem('token', authToken); // Token'ı depola
        navigate('/dashboard'); // Başarılı giriş sonrası yönlendirme
      }
    } catch (error) {
      console.error('Login Error:', error); // Hata yakala
      if (error.response && error.response.status === 400) {
        alert('Invalid email or password.'); // Hatalı giriş durumu
      } else {
        alert('An unexpected error occurred.'); // Diğer hatalar
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
          onSubmit={handleSubmit} // Form gönderildiğinde handleSubmit'i çağır
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <input
            type="email"
            name="email" // Email alanı
            placeholder="Email"
            value={credentials.email} // Kullanıcıdan alınan email değeri
            onChange={handleChange} // Değer değiştiğinde handleChange'i çağır
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="password"
            name="password" // Şifre alanı
            placeholder="Password"
            value={credentials.password} // Kullanıcıdan alınan şifre değeri
            onChange={handleChange} // Değer değiştiğinde handleChange'i çağır
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
