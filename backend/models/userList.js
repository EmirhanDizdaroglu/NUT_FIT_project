const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kullanıcı listesi öğesi için mongoose şemasını tanımlama
const userListItemSchema = new mongoose.Schema({
    name: String,       // Kullanıcının adı
    surname: String,    // Kullanıcının soyadı
    nickname: String,   // Kullanıcının takma adı
    email: String,      // Kullanıcının e-posta adresi
    phoneNumber: String,// Kullanıcının telefon numarası
    password: { type: String, required: true }, // Kullanıcının şifresi
    aim: String,        // Kullanıcının fitness ile ilgili hedefi
    Weight: Number,     // Kullanıcının ağırlığı
    Height: Number,     // Kullanıcının boyu
    BMI: Number,        // Kullanıcının Vücut Kitle İndeksi (BMI)
});

// Şifre hashleme işlemi için save öncesi hook
userListItemSchema.pre('save', async function (next) {
    // Şifre değiştirildiyse, yeni şifreyi hashle
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Metod kontrol etmek için password valid mi
userListItemSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Yukarıda tanımlanan şemayı kullanarak bir mongoose modeli oluşturma
const UserList = mongoose.model('UserList', userListItemSchema);

// Oluşturulan modeli dışa aktarma, böylece başka dosyalardan erişilebilir olur
module.exports = UserList;