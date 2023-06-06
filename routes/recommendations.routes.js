const express = require('express');
const router = express.Router();
const Recommendations = require('../models/Recommendations.model');

// GET /api/recommendations
// Fetch all recommendations
router.get('/', async (req, res) => {
  try {
    const recommendations = await Recommendations.find()
    .populate();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// POST /api/recommendations/create
// Create a new recommendation
router.post('/create', async (req, res) => {
  try {
    const { book, recommendedBy, recommendedTo } = req.body;
    const recommendation = await Recommendations.create({ book, recommendedBy, recommendedTo });
    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recommendation' });
  }
});

// DELETE /api/recommendations/:id
// Delete a recommendation by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recommendation = await Recommendations.findByIdAndDelete(id);
    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recommendation' });
  }
});

module.exports = router;
