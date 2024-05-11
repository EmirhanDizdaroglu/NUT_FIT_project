// Gerekli modülleri dahil et
const express = require('express'); // Express framework'ü
const router = express.Router(); // Express router'ını kullanarak yeni bir router oluştur
const AdminList = require('../models/adminList'); // AdminList modelini dahil et

// '/adminList' yoluna yapılan GET isteklerini işle
router.get('/adminList', async (req, res) => {
    try {
        // AdminList modeli kullanarak veritabanından tüm admin kayıtlarını bul
        const adminList = await AdminList.find();
        // Bulunan kayıtları JSON formatında yanıt olarak gönder
        res.json(adminList);
    } catch (error) {
        // Eğer bir hata oluşursa, 500 durum kodu ile hata mesajını gönder
        res.status(500).json({ message: error.message });
    }
});

// Admin girişi için bir POST route tanımı
router.post('/adminLogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Kullanıcı adı ve şifre ile Admin ara
        const admin = await AdminList.findOne({ username: username });

        // Eğer admin bulunamazsa hata dön
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Şifre kontrolü (Bu örnekte şifreleme kullanılmıyor)
        if (admin.password !== password) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Başarılı giriş durumunda mesaj dön
        res.json({ message: "Admin login successful." });
    } catch (error) {
        // Sunucu hatası durumunda hata mesajı dön
        res.status(500).json({ message: error.message });
    }
});
module.exports = router; 