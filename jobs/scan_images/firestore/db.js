const {Firestore} = require('@google-cloud/firestore');
const db = new Firestore();

async function getArtists() {
    const artistsRef = db.collection('artists');
    const snapshot = await artistsRef.get();
    const artists = [];
    snapshot.forEach(doc => artists.push({ id: doc.id, ...doc.data() }));
    return artists;
}

async function getArtworks() {
    const artworksRef = db.collection('artworks');
    const snapshot = await artworksRef.get();
    const artworks = [];
    snapshot.forEach(doc => artworks.push({ id: doc.id, ...doc.data() }));
    return artworks;
}
async function updateImageUrl(id, collection, imageUrl) {
    console.log("params", id, imageUrl)
    const docRef = db.collection(collection).doc(id.toString());
    console.log("Updating artist image URL:", id, imageUrl)
    // if artistRef already has image_url, don't update
    const element = await docRef.get();
    if (element.exists && element.data().image_url) {
        console.log("Image URL already exists for element:", id);
        return;
    } else {
        console.log("Updating image URL for element:", id);
        await docRef.update({ image_url: imageUrl });
    }
}

module.exports = { getArtists, updateImageUrl, getArtworks };
