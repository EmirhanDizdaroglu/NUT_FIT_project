// Gerekli modülleri dahil et
const express = require('express'); // Yönlendirme için Express çatısı
const router = express.Router(); // Yeni bir router örneği oluştur
const DietList = require('../models/dietList'); // DietList modelini dahil et

// '/dietList' yoluna gelen GET isteklerini işleyecek rota tanımı
router.get('/dietList', async (req, res) => {
    try {
        // DietList modeli kullanarak veritabanından tüm diyet listesi girişlerini bul
        const dietList = await DietList.find();
        // Sorgu başarılıysa, sonucu JSON formatında dön
        res.json(dietList);
    } catch (error) {
        // Sorgu sırasında bir hata oluşursa, 500 durum kodu ile hata mesajını dön
        res.status(500).json({ message: error.message });
    }
});

// Oluşturulan router'ı dışa aktar
// Bu sayede, başka dosyalarda bu router'ı kullanabiliriz
module.exports = router;
