// mongoose modülünü projeye dahil et
const mongoose = require('mongoose');

// Diet Listesi Öğesi için mongoose şemasını tanımla
// Bu şema, diyet listesinde yer alacak yiyeceklerin veya yemeklerin veri yapısını tanımlar
const dietListItemSchema = new mongoose.Schema({
    name: String,          // Yiyeceğin veya yemeğin adı
    portionSize: String,   // Porsiyon büyüklüğü, örneğin "100 gram", "1 tabak" vb.
    carbohydrates: Number, // Karbonhidrat miktarı (gram cinsinden)
    protein: Number,       // Protein miktarı (gram cinsinden)
    fat: Number,           // Yağ miktarı (gram cinsinden)
    calories: Number,      // Toplam kalori miktarı
    // öğün tipi ekle
});

// Yukarıda tanımlanan şemayı kullanarak bir Mongoose modeli oluştur
// Bu model, diyet listesi ile ilgili veritabanı işlemlerinde kullanılır
const DietList = mongoose.model('DietList', dietListItemSchema);

// Oluşturulan modeli dışa aktar
// Bu sayede, model başka dosyalarda require ile çağırılabilir ve kullanılabilir
module.exports = DietList;
