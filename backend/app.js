// Gerekli modülleri projeye dahil et
const express = require('express'); // Express.js web çatısını kullanmak için
const mongoose = require('mongoose'); // MongoDB veritabanı ile çalışmak için
const cors = require('cors'); // CORS desteği için gerekli
// cors kullanımı, özellikle web uygulamamızın farklı kaynaklardan
// (örneğin, bir frontend uygulaması farklı bir domainde veya portta çalışıyorsa) API'mize yapılan 
//isteklere güvenli bir şekilde izin vermek için gerekli.

// Oluşturulan router'ları dahil et
const dietListRouter = require('./routes/dietList'); // Diyet listesi için router
const sportMovementsRouter = require('./routes/sportMovements'); // Spor hareketleri için router
const adminListRouter = require('./routes/adminList'); // Admin listesi için router
const userListRouter = require('./routes/userList'); // Kullanıcı listesi için router

// Express uygulamasını başlat
const app = express();
const port = 5000; // Uygulamanın dinleyeceği port numarası

// JSON istek gövdelerini ayrıştırmak için middleware kullan
app.use(express.json());
// CORS politikalarını yönetmek için CORS middleware'ını kullan
app.use(cors());

// MongoDB'ye bağlan
mongoose.connect('mongodb://localhost:27017/NUT-FIT_db', {
   
});

// Veritabanı bağlantısını yönet
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Bağlanti hatasi:')); // Bağlantı hatası olduğunda
db.once('open', () => {
    console.log('MongoDB ye bağlandi'); // Bağlantı başarılı olduğunda
});

// API yollarını tanımla ve kullanılacak router'ları belirt
app.use('/api', dietListRouter); // Diyet listesi için API yolu
app.use('/api', sportMovementsRouter); // Spor hareketleri için API yolu
app.use('/api', adminListRouter); // Admin listesi için API yolu
app.use('/api', userListRouter); // Kullanıcı listesi için API yolu

// Sunucuyu başlat ve belirtilen portta dinlemeye başla
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde dinleniyor`);
});
