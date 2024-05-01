// Mongoose kütüphanesini projeye dahil ediyoruz.
const mongoose = require('mongoose');

// Spor hareketlerini tanımlayacak bir schema (şema) oluşturuyoruz.
// Bu schema, veritabanımızda spor hareketlerini nasıl saklayacağımızı tanımlar.
const sportMovementSchema = new mongoose.Schema({
    name: String, // Hareketin adı
    caloriesBurned: Number, // Yakılan kalori miktarı
    sets: [{ // Hareket setleri, her set reps (tekrar) ve repetitions (tekrar sayısı) içerir
        reps: Number,
        repetitions: Number
    }],
    targetLimb: String // Hedeflenen vücut bölgesi
});

// Yukarıda tanımladığımız schema'yı kullanarak bir model oluşturuyoruz.
// Bu model, veritabanı işlemlerimizde kullanacağımız ana arayüzü sağlar.
const SportMovement = mongoose.model('SportMovement', sportMovementSchema);

// Oluşturduğumuz modeli, diğer dosyalardan erişilebilir hale getiriyoruz.
module.exports = SportMovement;
