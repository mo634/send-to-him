const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Test endpoint is working!" });
});

module.exports = router;
