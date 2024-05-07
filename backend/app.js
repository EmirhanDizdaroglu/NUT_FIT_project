// Gerekli modülleri projeye dahil et
const express = require('express'); // Express.js web çatısını kullanmak için
const mongoose = require('mongoose'); // MongoDB veritabanı ile çalışmak için
const cors = require('cors'); // CORS desteği için gerekli
const app = express(); // Express uygulaması
const port = 5000; // Uygulamanın çalışacağı port

// Cors'u etkinleştir
app.use(cors()); // CORS politikalarını yönetmek için middleware kullan

// MongoDB'ye bağlan
mongoose.connect('mongodb://localhost:27017/NUT-FIT_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Bağlantı hatası:')); // Bağlantı hatası
db.once('open', () => console.log('MongoDB ye bağlandı')); // Başarılı bağlantı

// JSON istek gövdelerini ayrıştırmak için middleware
app.use(express.json());

// Router'ları dahil et ve kullan
const homeRouter = require('./routes/home'); // Yeni home router
const dietListRouter = require('./routes/dietList'); // Diyet listesi için router
const sportMovementsRouter = require('./routes/sportMovements'); // Spor hareketleri için router
const adminListRouter = require('./routes/adminList'); // Admin listesi için router
const userListRouter = require('./routes/userList'); // Kullanıcı listesi için router

app.use('/api', homeRouter); // Home için API yolu
app.use('/api', dietListRouter);
app.use('/api', sportMovementsRouter);
app.use('/api', adminListRouter);
app.use('/api', userListRouter);

// Sunucuyu başlat ve belirtilen portta dinlemeye başla
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde dinleniyor`);
});
