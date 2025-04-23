"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/admin/Breadcrumbs";
import { showConfetti } from "@/lib/utils/showConfetti";
export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSlugModified, setIsSlugModified] = useState(false);

  const generateSlug = (input: string) =>
    input
      .toLowerCase()
      .replace(/[άΆαΑ]/g, "a")
      .replace(/[έΈεΕ]/g, "e")
      .replace(/[ήΉηΗ]/g, "i")
      .replace(/[ίΊϊΐιΙ]/g, "i")
      .replace(/[όΌοΟ]/g, "o")
      .replace(/[ύΎϋΰυΥ]/g, "y")
      .replace(/[ώΏωΩ]/g, "o")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "");

  // Μοντελοποίηση ενός API call
  const saveCategory = async (categoryData: any): Promise<{ success: boolean; data: any }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { ...categoryData, id: Date.now() }
        });
      }, 800); // Προσομοίωση καθυστέρησης δικτύου
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    
    // Ενημέρωσε το slug μόνο αν δεν έχει τροποποιηθεί χειροκίνητα
    if (!isSlugModified) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = generateSlug(rawValue);
    setSlug(sanitizedValue);
    setIsSlugModified(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Δημιουργία preview του εικόνας
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleResetSlug = () => {
    setSlug(generateSlug(name));
    setIsSlugModified(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    
    // Δημιουργία αντικειμένου κατηγορίας
    const newCategory = {
      name,
      slug: slug || generateSlug(name),
      productCount: 0,
      image: imagePreview // Στην πραγματικότητα θα έπρεπε να ανεβεί στον server
    };
    
    try {
      // Κλήση του API (προσομοιωμένη)
      const response = await saveCategory(newCategory);
      
      if (response.success) {
        console.log("✅ Κατηγορία δημιουργήθηκε:", response.data);
        setSuccess(true);
        
        // Εμφάνιση confetti animation
        showConfetti();
        
        // Redirect μετά την επιτυχή αποθήκευση
        setTimeout(() => {
          router.push("/admin/categories");
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Σφάλμα κατά τη δημιουργία κατηγορίας:", error);
      // Εδώ θα μπορούσαμε να προσθέσουμε ένα state για εμφάνιση σφάλματος
    } finally {
      setLoading(false);
    }
  };

  // Confetti animation (απλή υλοποίηση)
  const showConfetti = () => {
    const confettiCount = 100;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)];
      confetti.style.borderRadius = '50%';
      confetti.style.top = '0';
      confetti.style.left = Math.random() * 100 + '%';
      container.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: 'translate3d(0, 0, 0)', opacity: 1 },
          { transform: `translate3d(${Math.random() * 100 - 50}px, ${Math.random() * 500 + 500}px, 0)`, opacity: 0 }
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: 'cubic-bezier(0,0,0.2,1)'
        }
      );

      animation.onfinish = () => {
        confetti.remove();
        if (container.childElementCount === 0) {
          container.remove();
        }
      };
    }
  };

  // Ελέγχει αν το slug είναι έγκυρο
  const isSlugValid = slug.length > 0;

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 sm:px-0">
    <Breadcrumbs />
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Νέα Κατηγορία
        </h1>
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md flex items-center">
            <svg className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Η κατηγορία δημιουργήθηκε επιτυχώς!</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Όνομα Κατηγορίας <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                required
                onChange={handleNameChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="π.χ. Ξηροί Καρποί"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="slug" className="text-sm font-medium text-gray-700 mb-1 flex justify-between">
                <span>Slug (URL)</span>
                {isSlugModified && (
                  <button 
                    type="button" 
                    onClick={handleResetSlug}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Επαναφορά αυτόματου
                  </button>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <span className="text-sm">melisa.gr/category/</span>
                </div>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  className={`block w-full pl-32 pr-10 py-3 border ${
                    isSlugValid ? 'border-gray-300' : 'border-red-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="xiroi-karpoi"
                />
                {isSlugValid && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Το slug χρησιμοποιείται στο URL της κατηγορίας και πρέπει να περιέχει μόνο
                λατινικούς χαρακτήρες, αριθμούς και παύλες.
              </p>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Εικόνα Κατηγορίας (προαιρετικό)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {imagePreview ? (
                  <div className="text-center">
                    <div className="mb-4 relative mx-auto w-32 h-32">
                      {/* Εδώ θα έμπαινε το component Image της Next.js σε πραγματική εφαρμογή */}
                      <img
                        src={imagePreview}
                        alt="Category preview"
                        className="object-cover w-full h-full rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{image?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Ανέβασμα αρχείου</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">ή σύρετε και αφήστε</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF έως 2MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ακύρωση
            </button>
            
            <button
              type="submit"
              disabled={loading || !isSlugValid}
              className={`flex items-center justify-center px-6 py-2.5 rounded-md text-sm font-medium text-white ${
                loading || !isSlugValid
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors min-w-[120px]`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Αποθήκευση...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Αποθήκευση
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}