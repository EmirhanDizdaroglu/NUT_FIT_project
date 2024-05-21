import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/style.css'; // CSS dosyası dahil ediliyor.

function UserPanel() {
    const location = useLocation();
    const { userName } = location.state; // userName state'den alınır

    return (
        <div className="admin-panel-container">
            <h1>Merhaba, {userName}</h1> {/* Kullanıcı adı en üstte gösteriliyor */}
            <h2>Kullanıcı İşlemleri</h2>
            <p>Hoşgeldin, {userName}</p> {/* Kullanıcı adı tekrar gösteriliyor */}

            <Link to="/UP_Settings" className="admin-panel-button user-list">
                Ayarlar
            </Link>
            <Link to="/UP_DietList" className="admin-panel-button diet-list">
                Diyet Listesi Oluştur
            </Link>
            <Link to="/UP_SportMovements" className="admin-panel-button sports-movements">
                Spor Hareketleri Oluştur
            </Link>
        </div>
    );
}

export default UserPanel;
