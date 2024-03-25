const express = require('express');
const router = express.Router();
const {fetchArtworks} = require('../services/artworks_service');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

router.get('/', async (req, res, next) => {
  try {
    const artistsRef = db.collection('artists');
    const snapshot = await artistsRef.get();
    const artists = [];
    snapshot.forEach(doc => {
      artists.push({ id: doc.id, ...doc.data() });
    });
    res.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const doc = await db.collection('artists').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Artist not found.' });
    }
    const artist = doc.data();
    await fetchArtworks().then(artworks => {
      artist.artworks = artworks;
    });
    res.json(artist);
  } catch (error) {
    console.error("Error fetching artist details:", error);
    res.status(500).json({ error: 'An error occurred while fetching artist details.' });
  }
});

module.exports = router;