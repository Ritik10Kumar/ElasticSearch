const express = require('express');
const { syncEmails } = require('../services/emailSyncService');

const router = express.Router();

router.post('/add', async (req, res) => {
    const { email, password } = req.body;

    try {
        await syncEmails(email, password, `emails_${email}`);
        res.status(200).json({ message: 'Account added and emails synchronized!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add account!' });
    }
});

module.exports = router;
