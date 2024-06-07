const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// CORS (Cross-Origin Resource Sharing) ayarları
// Bu ayarlar, farklı kökenden gelen isteklerin kabul edilmesini sağlar.
// Burada React uygulamasının çalıştığı adres belirtilmiştir.
app.use(cors({
    origin: 'http://localhost:3000', // React uygulamasının çalıştığı adres
    credentials: true // Oturum bilgilerini taşıyabilmek için
}));

// JSON verilerin işlenmesi için middleware
app.use(express.json());

// Session middleware
// Kullanıcı oturumlarının yönetimi için kullanılır.
// secret: Oturum bilgilerini şifrelemek için kullanılır. Güvenli bir anahtar olmalıdır.
// resave: Her istekte oturumu yeniden kaydetmemesi için false.
// saveUninitialized: Yeni oluşturulan fakat değiştirilmemiş oturumları kaydetmemesi için true.
// cookie: Çerezlerin ayarlarını belirler. production ortamında secure: true olmalıdır.
app.use(session({
    secret: 'your_secret_key', // Güvenli bir anahtar kullanılmalı
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false } // production ortamında secure: true olmalı
}));

// Router'ların dahil edilmesi
// Bu kısımlar, ilgili yönlendirme dosyalarının yüklenmesini sağlar.
const homeRouter = require('./routes/home');
const dietListRouter = require('./routes/dietList');
const sportMovementsRouter = require('./routes/sportMovements');
const adminListRouter = require('./routes/adminList');
const userListRouter = require('./routes/userList');

// API yönlendirmeleri
// Gelen isteklerin ilgili router dosyalarına yönlendirilmesini sağlar.
app.use('/api', homeRouter);
app.use('/api', dietListRouter);
app.use('/api', sportMovementsRouter);
app.use('/api', adminListRouter);
app.use('/api', userListRouter);

// MongoDB bağlantısı
// MongoDB veritabanına bağlanmayı sağlar.
// useNewUrlParser ve useUnifiedTopology, MongoDB'nin yeni özelliklerini kullanmayı sağlar.
mongoose.connect('mongodb://localhost:27017/NUT-FIT_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// MongoDB bağlantı olayları
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Bağlantı hatası:')); // Bağlantı hatası olduğunda konsola hata mesajı yazdırır.
db.once('open', () => console.log('MongoDB ye bağlandı')); // Bağlantı başarılı olduğunda konsola mesaj yazdırır.

// Sunucunun başlatılması
// Belirtilen port üzerinde sunucuyu dinlemeye başlar.
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde dinleniyor`);
});
