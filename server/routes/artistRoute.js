const express = require('express');
const router = express.Router();
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

module.exports = router;