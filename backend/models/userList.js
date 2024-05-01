// mongoose paketini projeye dahil etme
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kullanıcı listesi öğesi için mongoose şemasını tanımlama
const userListItemSchema = new mongoose.Schema({
    name: String,       // Kullanıcının adı
    surname: String,    // Kullanıcının soyadı
    nickname: String,   // Kullanıcının takma adı
    BMI: Number,        // Kullanıcının Vücut Kitle İndeksi (BMI)
    Weight: Number,     // Kullanıcının ağırlığı
    Height: Number,     // Kullanıcının boyu
    email: String,      // Kullanıcının e-posta adresi
    phoneNumber: String,// Kullanıcının telefon numarası
    password: { type: String, required: true }, 
    aim: String,        // Kullanıcının fitness ile ilgili hedefi
});


//  BMI hesabı yap ve  hashle kaydetmeden şifreyi
userListItemSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    
    // BMI hesapla eğer kilo boy değişirse
    if (this.isModified('Weight') || this.isModified('Height')) {
        this.BMI = (this.Weight / ((this.Height / 100) ** 2));
    }

    next();
});

// Metod kontrol etmek için password valid mi
userListItemSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Yukarıda tanımlanan şemayı kullanarak bir mongoose modeli oluşturma
const userList = mongoose.model('userList', userListItemSchema);

// Oluşturulan modeli dışa aktarma, böylece başka dosyalardan erişilebilir olur
module.exports = userList;
