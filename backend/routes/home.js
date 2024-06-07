const express = require('express');
const router = express.Router();

// Home endpoint'ine JSON döndüren bir GET rotası
router.get('/home', (req, res) => {
  res.json({ title: 'NUT-FIT PROJECT', content: 'Get Ready to See the BEST VERSION of Yourself!' });
});

module.exports = router;
