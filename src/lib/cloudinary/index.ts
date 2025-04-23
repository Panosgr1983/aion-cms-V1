import { v2 as cloudinary } from 'cloudinary';

// Ρύθμιση του Cloudinary με τα κλειδιά από τις μεταβλητές περιβάλλοντος
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Ανεβάζει μια εικόνα στο Cloudinary
 * @param file Το αρχείο προς ανέβασμα
 * @returns Πληροφορίες για την εικόνα που ανέβηκε
 */
export const uploadImage = async (file: File) => {
  try {
    // Μετατροπή του αρχείου σε base64
    const base64data = await toBase64(file);
    
    // Δημιουργία του FormData για το upload
    const formData = new FormData();
    formData.append('file', base64data);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'melisa_unsigned');
    
    // Ανέβασμα στο Cloudinary μέσω του API
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

/**
 * Ανακτά εικόνες από το Cloudinary
 * @param folder Ο φάκελος από τον οποίο θα ανακτηθούν οι εικόνες (προαιρετικό)
 * @returns Λίστα με τις εικόνες
 */
export const getImages = async (folder?: string) => {
  try {
    // Ετοιμάζουμε τις παραμέτρους για το API
    const params: any = {
      resource_type: 'image',
      max_results: 100,
    };
    
    if (folder) {
      params.prefix = folder;
      params.type = 'upload';
    }
    
    // Κλήση του API για να πάρουμε τις εικόνες
    const result = await cloudinary.api.resources(params);
    
    return result.resources;
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    throw error;
  }
};

/**
 * Διαγράφει μια εικόνα από το Cloudinary
 * @param publicId Το public ID της εικόνας
 * @returns Αποτέλεσμα της διαγραφής
 */
export const deleteImage = async (publicId: string) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

/**
 * Μετατρέπει ένα αρχείο σε base64 string
 * @param file Το αρχείο προς μετατροπή
 * @returns base64 string
 */
const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
