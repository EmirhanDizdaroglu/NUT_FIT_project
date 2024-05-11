// Gerekli modülleri projeye dahil et
const express = require('express');
const router = express.Router(); // Express router'ını oluştur
const SportMovement = require('../models/sportMovements'); // SportMovement modelini dahil et

// '/sportMovements' yoluna gelen GET isteklerini işle
router.get('/sportMovements', async (req, res) => {
    try {
        // Veritabanından tüm spor hareketlerini sorgula
        const sportMovements = await SportMovement.find();
        // Sorgu başarılıysa, spor hareketlerini JSON formatında dön
        res.json(sportMovements);
    } catch (error) {
        // Hata oluşursa, 500 durum kodu ile hata mesajını dön
        res.status(500).json({ message: error.message });
    }
});
// '/sportMovements' POST endpoint'i - Yeni hareket ekler
router.post('/sportMovements', async (req, res) => {
    const movement = new SportMovement({
        name: req.body.name,
        caloriesBurned: req.body.caloriesBurned,
        sets: req.body.sets,
        targetLimb: req.body.targetLimb
    });

    try {
        const newMovement = await movement.save();
        res.status(201).json(newMovement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// '/sportMovements/:id' PUT endpoint'i - Mevcut hareketi günceller
router.put('/sportMovements/:id', async (req, res) => {
    try {
        const updatedMovement = await SportMovement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// '/sportMovements/:id' DELETE endpoint'i - Hareketi siler
router.delete('/sportMovements/:id', async (req, res) => {
    try {
        const movement = await SportMovement.findByIdAndDelete(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movement not found' });
        }
        res.json({ message: 'Movement deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Oluşturulan router'ı dışa aktar
// Bu sayede, başka dosyalarda bu router kullanılabilir hale gelir
module.exports = router;
