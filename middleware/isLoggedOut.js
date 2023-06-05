const express = require('express');
const router = express.Router();
const isLoggedOut = require('../middleware/isLoggedOut');

// Route that requires user to be logged out
router.get('/login', isLoggedOut, (req, res) => {
  // Handle login route logic here
});

// Other routes...

module.exports = router;
