// mongoose modülünü projeye dahil et
const mongoose = require('mongoose');

// Admin Listesi Öğesi için mongoose şemasını tanımla
// Bu şema, yönetici kullanıcılarının veri yapısını tanımlar
const adminListItemSchema = new mongoose.Schema({
    name: String,        // Yöneticinin adı
    surname: String,     // Yöneticinin soyadı
    email: String,       // Yöneticinin e-posta adresi, genellikle giriş için kullanılır
    phoneNumber: String, // Yöneticinin telefon numarası, iletişim için önemli
    password: String,    // Yöneticinin hesabına erişim sağlayan şifre
    username: String     // Yöneticinin benzersiz kullanıcı adı, genellikle giriş için kullanılır
});

// Yukarıda tanımlanan şemayı kullanarak bir Mongoose modeli oluştur
// Bu model, veritabanı işlemlerinde kullanılır
const adminList = mongoose.model('adminList', adminListItemSchema);

// Oluşturulan modeli dışa aktar
// Bu sayede, model başka dosyalarda require ile çağırılabilir ve kullanılabilir
module.exports = adminList;
