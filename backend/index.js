const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/accounts', accountRoutes);
app.use('/api/emails', emailRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
