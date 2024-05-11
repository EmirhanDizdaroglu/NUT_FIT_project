// Gerekli modülleri projeye dahil et
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router(); // Express router'ını oluştur
const UserList = require('../models/userList'); // UserList modelini dahil et

// '/userList' yoluna gelen GET isteklerini işle
router.get('/userList', async (req, res) => {
    try {
        const userList = await UserList.find();
        res.json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı kayıt için
router.post('/register', async (req, res) => {
    const { name, surname, nickname, Weight, Height, email, phoneNumber, password, aim, bmi } = req.body;
    
    try {
        const existingUser = await UserList.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const user = new UserList({
            name, surname, nickname, Weight, Height, email, phoneNumber, password, aim, BMI: bmi
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı giriş için
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserList.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        res.json({ message: "Login successful.", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı profilini görüntüleme
router.get('/userProfile', async (req, res) => {
    try {
        const userId = req.user.id; // Oturumdan alınacak
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
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname, email, phoneNumber, Weight, Height, aim } = req.body;

    try {
        const updatedUser = await UserList.findByIdAndUpdate(id, {
            name, surname, email, phoneNumber, Weight, Height, aim
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı silme
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserList.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
