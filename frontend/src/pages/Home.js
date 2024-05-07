import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null); // Veri çekme için bir state

  useEffect(() => {
    fetch('http://localhost:5000/api/home') // Backend endpoint'ine istek
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      
      .then((json) => setData(json)) // Veri başarılı şekilde alındığında state'i güncelle
      .catch((error) => console.error('Error fetching data:', error)); // Hata durumunda konsolda bilgi ver
  }, []); // Bu kod bloğu sadece bileşen ilk kez yüklendiğinde çalışır

  if (!data) {
    return <div>Loading...</div>; // Veri gelmezse yüklenme ekranı göster
  }

  return (
    <div style={{ minHeight: '40vh', backgroundColor: '#48BB78' }}>
      <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
          {data.title || 'Welcome to NUT-FIT'}
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '30px' }}>{data.content || 'Start your journey to a healthier you.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link
            to="/login"
            style={{ backgroundColor: '#4299E1', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center' }}
          >
            User Login
          </Link>
          <Link
            to="/adminLogin"
            style={{ backgroundColor: '#38A169', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center' }}
          >
            Admin Login
          </Link>
          <Link
            to="/register"
            style={{ backgroundColor: '#D97706', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', textAlign: 'center' }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
