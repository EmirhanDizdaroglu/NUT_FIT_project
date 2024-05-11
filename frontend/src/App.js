// App.js // React'i ve gerekli bileşenleri import ediyoruz
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Uygulama sayfalarını import eder
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AP_DietList from './pages/AP_DietList';
import AP_SportMovements from './pages/AP_SportMovements';
import AP_UserList from './pages/AP_UserList';

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
    <Route path="/adminPanel" element={<AdminPanel />} />
    <Route path="/AP_DietList" element={<AP_DietList />} />
    <Route path="/AP_SportMovements" element={<AP_SportMovements />} />
    <Route path="/AP_UserList" element={<AP_UserList />} />
  </Routes>
</Router>

  );
}

export default App;