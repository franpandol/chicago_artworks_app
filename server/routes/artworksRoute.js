const express = require('express');
const router = express.Router();
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

router.get('/', async (req, res, next) => {
    try {
        const artworksRef = db.collection('artworks');
        const snapshot = await artworksRef.get();
        const artworks = [];
        snapshot.forEach(doc => {
            artworks.push({ id: doc.id, ...doc.data() });
        });
        res.json(artworks);
    } catch (error) {
        console.error("Error fetching artworks:", error);
        res.status(500).send('Internal Server Error');
    }
}
);
router.get('/find/:artistTitle', async (req, res, next) => {
    const { artistTitle } = req.params;
    const artworksRef = db.collection('artworks');
    const snapshot = await artworksRef.where('artist_title', '==', artistTitle).get();
    const artworks = [];
    snapshot.forEach(doc => {
        artworks.push({ id: doc.id, ...doc.data() });
    });
    res.json(artworks);
});


router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const doc = await db.collection('artworks').doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Artwork not found.' });
        }
        const artwork = doc.data();
        console.log(artwork);
        res.json(artwork);
    } catch (error) {
        console.error("Error fetching artwork details:", error);
        res.status(500).json({ error: 'An error occurred while fetching artwork details.' });
    }
});

module.exports = router;
