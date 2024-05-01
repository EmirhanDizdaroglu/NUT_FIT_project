// App.js // React'i ve gerekli bileşenleri import ediyoruz
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Uygulama sayfalarını import eder
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';

// App adlı fonksiyonel bileşeni tanımlar
const App = () => {
  return (
    // BrowserRouter kullanarak yönlendirme yapısını başlatır
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminLogin" element={<AdminLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
