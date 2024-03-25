const axios = require('axios');


function getArtworkImage(artwork){
    return `https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`;
    
}
async function fetchArtworks(artistTitle) {
    const BASE_URL = 'https://api.artic.edu/api/v1';
    const response = await axios.get(`${BASE_URL}/artworks/search`, {
        params: {
            q: artistTitle,
            limit: 10,
            fields: 'id,title,image_id,artist_title,date_display,place_of_origin,medium_display'
        }
    });
    // aggregate image_url
    response.data.data.forEach(artwork => {
        artwork.image_url = getArtworkImage(artwork);
    });
    console.log(response.data.data)
    return response.data.data;
}

module.exports = { fetchArtworks };