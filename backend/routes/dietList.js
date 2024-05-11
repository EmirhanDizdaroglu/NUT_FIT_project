const express = require('express');
const router = express.Router();
const DietList = require('../models/dietList');



// Tüm diyet listesi öğelerini getir
router.get('/dietList', async (req, res) => {
    try {
        const dietList = await DietList.find();
        res.json(dietList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching diet list: " + error.message });
    }
});

// Yeni diyet listesi öğesi ekle
router.post('/dietList', async (req, res) => {
    const newDietItem = new DietList(req.body);
    try {
        await newDietItem.save();
        res.status(201).json(newDietItem);
    } catch (error) {
        res.status(400).json({ message: "Error saving new diet item: " + error.message });
    }
});

// Diyet listesi öğesini güncelle
router.put('/dietList/:id', async (req, res) => {
    try {
        const updatedDietItem = await DietList.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDietItem) {
            return res.status(404).json({ message: "Diet item not found." });
        }
        res.json(updatedDietItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating diet item: " + error.message });
    }
});

// Diyet listesi öğesini sil
router.delete('/dietList/:id', async (req, res) => {
    try {
        const deletedDietItem = await DietList.findByIdAndDelete(req.params.id);
        if (!deletedDietItem) {
            return res.status(404).json({ message: "Diet item not found." });
        }
        res.status(200).json({ message: "Diet item deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting diet item: " + error.message });
    }
});

module.exports = router;