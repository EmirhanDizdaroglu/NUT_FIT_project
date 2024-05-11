import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; // CSS dosyasını import eder

function AdminPanel() {
    return (
        <div className="admin-panel-container"> {/* Kutulu görünüm için stil */}
            <h1>Admin Panel</h1>
            <h2>Admin Operations</h2>

            <Link to="/AP_UserList" className="admin-panel-button user-list">
                User List
            </Link>
            <Link to="/AP_DietList" className="admin-panel-button diet-list">
                Diet List
            </Link>
            <Link to="/AP_SportMovements" className="admin-panel-button sports-movements">
                Sports Movements
            </Link>
        </div>
    );
}

export default AdminPanel;
