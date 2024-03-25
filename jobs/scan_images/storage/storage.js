const {Storage} = require('@google-cloud/storage');
const sharp = require('sharp');
const axios = require('axios');
const storage = new Storage();
const bucketName = 'museum_bucket';

async function uploadImageToStorage(elementId, elementFolder, imageUrl) {
    const imageResponse = await axios({ url: imageUrl, responseType: 'arraybuffer' });
    const compressedImage = await sharp(imageResponse.data).jpeg({ quality: 80 }).toBuffer();
    const fileName = `${elementFolder}/${elementId}.jpg`;
    const file = storage.bucket(bucketName).file(fileName);
    
    await file.save(compressedImage, { metadata: { contentType: 'image/jpeg' } });
    console.log(file.publicUrl())
    return file.publicUrl();
}

module.exports = { uploadImageToStorage };
