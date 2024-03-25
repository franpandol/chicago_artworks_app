const axios = require('axios');

async function fetchArtworks(artistTitle) {
    const BASE_URL = 'https://api.artic.edu/api/v1';
    const response = await axios.get(`${BASE_URL}/artworks/search`, {
        params: {
            q: artistTitle,
            limit: 10,
            fields: 'id,title,image_id,artist_title,date_display,place_of_origin,medium_display'
        }
    });
    return response.data.data;
}

module.exports = { fetchArtworks };