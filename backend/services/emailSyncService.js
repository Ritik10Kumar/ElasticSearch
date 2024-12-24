const { connectToIMAP, fetchEmails } = require('./imapService');
const { saveEmails } = require('./elasticsearchService');

async function syncEmails(email, password, index) {
    const imap = await connectToIMAP(email, password);
    const emails = await fetchEmails(imap);
    await saveEmails(index, emails);
    imap.end();
}

module.exports = { syncEmails };
