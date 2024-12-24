const express = require('express');
const { getEmails } = require('../services/elasticsearchService');

const router = express.Router();

router.get('/', async (req, res) => {
    const { email } = req.query;

    try {
        const emails = await getEmails(`emails_${email}`);
        res.status(200).json({ emails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch emails!' });
    }
});

module.exports = router;
