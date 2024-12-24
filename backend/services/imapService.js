const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

async function connectToIMAP(email, password) {
    const config = {
        imap: {
            user: email,
            password,
            host: 'outlook.office365.com',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };

    return imaps.connect(config);
}

async function fetchEmails(imap) {
    await imap.openBox('INBOX');
    const messages = await imap.search(['ALL'], { bodies: ['HEADER', 'TEXT'], markSeen: false });

    return Promise.all(messages.map(async msg => {
        const parsed = await simpleParser(msg.parts.find(part => part.which === 'TEXT').body);
        return {
            subject: parsed.subject,
            from: parsed.from.text,
            date: parsed.date,
            body: parsed.text
        };
    }));
}

module.exports = { connectToIMAP, fetchEmails };
