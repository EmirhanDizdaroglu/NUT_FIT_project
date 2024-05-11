import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '', // Kullanıcı adı alanı
    password: ''  // Şifre alanı
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
    e.preventDefault(); // Form gönderimini önlemek için
    try {
      const response = await axios.post('http://localhost:5000/api/AdminLogin', credentials);

      if (response.status === 200) { // Giriş başarılıysa
        const authToken = response.data.token;
        localStorage.setItem('token', authToken); // Token saklama
        navigate('/AdminPanel'); // Başarılı giriş sonrası Admin Panel sayfasına yönlendir
      } else {
        // Giriş başarısız ise hata mesajı göster
        alert('Admin login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('AdminLogin Error:', error);
      alert('AdminLogin failed. Please check your username and password.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh', // Sayfanın tamamını kaplayacak şekilde
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Hafif arka plan rengi
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '32px', // 8 birimlik padding
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Hafif gölge
          borderRadius: '8px', // Yuvarlatılmış köşeler
        }}
      >
        <h1
          style={{
            fontSize: '24px', // Başlık boyutu
            fontWeight: 'bold', // Kalın yazı tipi
            marginBottom: '16px', // Alt kısımda boşluk
          }}
        >
          Admin Login Page
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column', // Dikey hizalama
            gap: '16px', // Elemanlar arası boşluk
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            style={{
              padding: '8px', // İç boşluk
              border: '1px solid #ccc', // Kenarlık
              borderRadius: '4px', // Hafif yuvarlatma
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
            type="submit" // Form gönderimini işaretler
            style={{
              padding: '12px', // Buton içi boşluk
              color: 'white', // Metin rengi
              backgroundColor: 'blue', // Buton rengi
              borderRadius: '4px', // Hafif yuvarlatma
              border: 'none',
              cursor: 'pointer', // Fare işareti
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'darkblue'; // Hover efekti
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'blue'; // Normal durum
            }}
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;