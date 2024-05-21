const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// CORS ayarları
app.use(cors({
    origin: 'http://localhost:3000', // React uygulamasının çalıştığı adres
    credentials: true // Oturum bilgilerini taşıyabilmek için
}));

app.use(express.json());

// Session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false } // production ortamında secure: true olmalı
}));

const homeRouter = require('./routes/home');
const dietListRouter = require('./routes/dietList');
const sportMovementsRouter = require('./routes/sportMovements');
const adminListRouter = require('./routes/adminList');
const userListRouter = require('./routes/userList');

app.use('/api', homeRouter);
app.use('/api', dietListRouter);
app.use('/api', sportMovementsRouter);
app.use('/api', adminListRouter);
app.use('/api', userListRouter);

mongoose.connect('mongodb://localhost:27017/NUT-FIT_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Bağlantı hatası:'));
db.once('open', () => console.log('MongoDB ye bağlandı'));

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde dinleniyor`);
});