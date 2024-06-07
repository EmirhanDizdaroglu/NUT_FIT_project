const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const UserList = require('../models/userList');

// Kullanıcı oturumunu doğrulama middleware'i
function authenticateUser(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

// Kullanıcı kayıt işlemi
router.post('/register', async (req, res) => {
    const { name, surname, nickname, Weight, Height, email, phoneNumber, password, aim, bmi } = req.body;
    
    try {
        // Mevcut bir kullanıcı olup olmadığını kontrol et
        const existingUser = await UserList.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Yeni kullanıcı oluştur ve kaydet
        const user = new UserList({
            name, surname, nickname, Weight, Height, email, phoneNumber, password, aim, BMI: bmi
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
        console.error('Kayıt sırasında hata oluştu:', error);
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı giriş işlemi
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kullanıcıyı e-posta ile bul
        const user = await UserList.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Parolayı kontrol et
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Oturum başlat
        req.session.userId = user._id;

        res.json({ message: "Login successful.", userName: user.name });
    } catch (error) {
        console.error('Giriş sırasında hata oluştu:', error);
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı profilini görüntüleme
router.get('/userProfile', authenticateUser, async (req, res) => {
    try {
        // Kullanıcıyı oturum kimliği ile bul
        const user = await UserList.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı profilini güncelleme
router.put('/userProfile', authenticateUser, async (req, res) => {
    const { name, surname, email, phoneNumber, Weight, Height, aim } = req.body;

    try {
        // BMI hesapla
        const heightInMeters = Height / 100;
        const BMI = (Weight / (heightInMeters * heightInMeters)).toFixed(2);

        // Kullanıcıyı güncelle
        const updatedUser = await UserList.findByIdAndUpdate(req.session.userId, {
            name, surname, email, phoneNumber, Weight, Height, aim, BMI
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Profil güncelleme sırasında hata oluştu:', error);
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı listesi
router.get('/userList', async (req, res) => {
    try {
        // Tüm kullanıcıları getir
        const userList = await UserList.find();
        res.json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı silme işlemi
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Kullanıcıyı sil
        const deletedUser = await UserList.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı güncelleme işlemi
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, phoneNumber, Weight, Height, aim } = req.body;

    try {
        // Kullanıcıyı güncelle
        const updatedUser = await UserList.findByIdAndUpdate(id, {
            name, surname, email, phoneNumber, Weight, Height, aim
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Kullanıcı güncelleme sırasında hata oluştu:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
