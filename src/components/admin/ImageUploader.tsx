"use client";

import { useState } from "react";

type Props = {
  onUpload: (result: any) => void;
  accept?: string;
  maxSize?: number;
};

export default function ImageUploader({
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateAndPreview = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Το αρχείο πρέπει να είναι εικόνα.");
      return;
    }
    if (file.size > maxSize) {
      setError(`Μέγιστο μέγεθος: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      // Αν υπάρχει cloudinary wrapper, βάλε εδώ
      // const result = await uploadImage(file);
      // onUpload(result);

      // Mock fallback για demo:
      const result = {
        secure_url: URL.createObjectURL(file),
        original_filename: file.name,
      };
      onUpload(result);
    } catch (err) {
      setError("Αποτυχία κατά το ανέβασμα.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndPreview(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndPreview(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`p-6 rounded-lg border-2 border-dashed transition ${
        isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300"
      }`}
    >
      <div className="text-center">
        <input
          type="file"
          id="image"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
        <label
          htmlFor="image"
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Επιλέξτε εικόνα ή σύρετε εδώ
        </label>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG, GIF έως {(maxSize / 1024 / 1024).toFixed(1)}MB
        </p>

        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded shadow"
            />
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        {isUploading && (
          <p className="mt-2 text-sm text-gray-400">Ανέβασμα...</p>
        )}
      </div>
    </div>
  );
}