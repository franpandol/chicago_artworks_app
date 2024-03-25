const { getArtists, updateImageUrl, getArtworks } = require('./firestore/db');
const { fetchWikiImage } = require('./wiki/wiki');
const { uploadImageToStorage } = require('./storage/storage');

async function scanImages() {
    const artists = await getArtists();
    
    for (let artist of artists) {
        // if artist.image_url is already set, skip
        if (artist.image_url) {
            console.log("Image URL already exists for artist:", artist.title);
            continue;
        }
        try {
            const imageUrl = await fetchWikiImage(artist.title);
            if (imageUrl) {
                const storageUrl = await uploadImageToStorage(artist.id, "artists", imageUrl);
                console.log("Stored image for artist:", storageUrl);
                await updateImageUrl(artist.id, "artists", storageUrl);
            }
        } catch (error) {
            console.error("Error processing artist:", artist.title, error);
        }
    }
}
async function getArtworkImage(artwork){
    return `https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`;
    
}

async function scanArtworks() {
    const artworks = await getArtworks();

    for (let artwork of artworks) {
        // if artwork.image_url is already set, skip
        if (artwork.image_url) {
            console.log("Image URL already exists for artwork:", artwork.title);
            continue;
        }

        try {
            const imageUrl = await getArtworkImage(artwork);
            if (imageUrl) {
                const storageUrl = await uploadImageToStorage(artwork.id, "artworks", imageUrl);
                console.log("Stored image for artwork:", storageUrl);
                await updateImageUrl(artwork.id, "artworks", storageUrl);
            }
        } catch (error) {
            console.error("Error processing artwork:", artwork.title, error);
        }
    }
}
module.exports = { scanImages, scanArtworks};