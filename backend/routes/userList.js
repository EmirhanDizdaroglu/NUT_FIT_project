// Gerekli modülleri projeye dahil et
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router(); // Express router'ını oluştur
const UserList = require('../models/userList'); // UserList modelini dahil et

// '/userList' yoluna gelen GET isteklerini işle
router.get('/userList', async (req, res) => {
    try {
        // Veritabanından tüm kullanıcıları sorgula
        const userList = await UserList.find();
        // Sorgu başarılıysa, kullanıcı listesini JSON formatında dön
        res.json(userList);
    } catch (error) {
        // Hata oluşursa, 500 durum kodu ile hata mesajını dön
        res.status(500).json({ message: error.message });
    }
});

// Route user registration icin
router.post('/register', async (req, res) => {
    const { name, surname, nickname, Weight, Height, email, phoneNumber, password, aim } = req.body;
    
    // Validate password requirements
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/;
    if (!passwordPattern.test(password)) {
        return res.status(400).json({ message: "Password does not meet criteria." });
    }

    try {
        // Check if email is already in use
        const existingUser = await UserList.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Create new user
        const user = new UserList({
            name, surname, nickname, Weight, Height, email, phoneNumber, password, aim
        });
        await user.save();
        
        res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route, user login için
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserList.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the password matches
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Return success message
        res.json({ message: "Login successful.", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı profil bilgilerini GET ile çekme
router.get('/userProfile', async (req, res) => {
    try {
        // Oturum doğrulama  Kullanıcı ID'si, normalde oturumdan alınır
        const userId = req.user.id;
        const user = await UserList.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı profilini güncelleme
router.put('/userProfile', async (req, res) => {
    try {
        // Oturum doğrulama Kullanıcı ID'si, normalde oturumdan alınır
        const userId = req.user.id;
        const { Weight, Height, aim } = req.body;
        const user = await UserList.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Kullanıcının bilgilerini güncelle
        user.Weight = Weight;
        user.Height = Height;
        user.aim = aim;
        
        // BMI hesapla
        if (Weight && Height) {
            user.BMI = (Weight / ((Height / 100) ** 2)).toFixed(2);  // BMI'yı iki ondalık basamakla sınırla
        }

        await user.save();
        res.json({ message: "Profile updated successfully.", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Oluşturulan router'ı dışa aktar
// Bu sayede, başka dosyalarda bu router kullanılabilir hale gelir
module.exports = router;