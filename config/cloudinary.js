const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'actor_management',
            resource_type: file.mimetype.startsWith('audio') ? 'video' : 'image', // 'video' for audio files
            public_id: `${Date.now()}-${file.originalname}`,
        };
    },
});

module.exports = { cloudinary, storage };
