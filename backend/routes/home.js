const express = require('express');
const router = express.Router();

// Home endpoint'ine JSON döndüren bir GET rotası
router.get('/home', (req, res) => {
  res.json({ title: 'Express Home Page', content: 'Welcome to our React-Express application!' });
});

module.exports = router;
