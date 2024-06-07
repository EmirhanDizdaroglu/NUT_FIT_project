import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AP_DietList from './pages/AP_DietList';
import AP_SportMovements from './pages/AP_SportMovements';
import AP_UserList from './pages/AP_UserList';
import UserPanel from './pages/UserPanel';
import UP_Settings from './pages/UP_Settings';
import UP_DietList from './pages/UP_DietList'; 
import UP_SportMovements from './pages/UP_SportMovements';

const App = () => {
  return (
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
        <Route path="/userPanel" element={<UserPanel />} /> {/* Yeni rota ekle */}
        <Route path="/UP_Settings" element={<UP_Settings />} />
        <Route path="/UP_DietList" element={<UP_DietList />} /> {/* UP_DietList rotasını ekle */}
        <Route path="/UP_SportMovements" element={<UP_SportMovements />} />
      </Routes>
    </Router>
  );
}

export default App;
