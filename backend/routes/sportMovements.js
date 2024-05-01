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

// Oluşturulan router'ı dışa aktar
// Bu sayede, başka dosyalarda bu router kullanılabilir hale gelir
module.exports = router;
