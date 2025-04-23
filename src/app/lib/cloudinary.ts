import { v2 as cloudinary } from 'cloudinary';

// Ρύθμιση cloudinary με τα credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'abcdefghijklmn',
  secure: true
});

export default cloudinary;