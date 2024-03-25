const axios = require('axios');

async function fetchWikiImage(title) {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
            action: 'query',
            format: 'json',
            titles: title,
            prop: 'pageimages',
            pithumbsize: 100,
            origin: '*'
        }
    });
    console.log(response.data.query.pages);
    const pages = response.data.query.pages;
    for (let page in pages) {
        if (pages[page].thumbnail) {
            return pages[page].thumbnail.source;
        }
    }
    return null;
}

module.exports = { fetchWikiImage };
