const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({ node: 'http://localhost:9200' });

async function saveEmails(index, emails) {
    for (const email of emails) {
        await esClient.index({
            index,
            document: email
        });
    }
}

async function getEmails(index) {
    const { hits } = await esClient.search({
        index,
        query: { match_all: {} }
    });
    return hits.hits.map(hit => hit._source);
}

module.exports = { saveEmails, getEmails };
