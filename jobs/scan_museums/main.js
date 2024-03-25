const axios = require('axios');
const {Firestore} = require('@google-cloud/firestore');

const BASE_URL = 'https://api.artic.edu/api/v1';

async function scanMuseum() {
    try {
      const response = await axios.get(`${BASE_URL}/artists`);
      const artists = response.data.data;

      await storeArtists(artists);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching artists.' });
    }

}

async function scanArtworks() {

  try {
    const response = await axios.get(`${BASE_URL}/artworks`, { params: { limit: 10, fields: 'id,title,image_id,artist_title,date_display,place_of_origin,medium_display' } });
    const artworks = response.data.data;
    await storeArtworks(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching artworks.' });
  }
}
async function storeArtists(artists) {
    const firestore = new Firestore();
    const collection = firestore.collection('artists');
    for (let artist of artists) {
        const doc = collection.doc(artist.id.toString());
        await doc.set(artist);
        console.log(`Stored artist ${artist.id}`);
    }
}

async function storeArtworks(artworks) {
    const firestore = new Firestore();
    const collection = firestore.collection('artworks');
    for (let artwork of artworks) {
        const doc = collection.doc(artwork.id.toString());
        await doc.set(artwork);
        console.log(`Stored artwork ${artwork.id}`);
    }
}

module.exports = { scanMuseum, scanArtworks };
