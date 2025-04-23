# AION CMS

Το AION CMS είναι ένα σύγχρονο Content Management System βασισμένο στο Next.js 14, TypeScript και Cloudinary.

## Λειτουργίες

- **Διαχείριση Προϊόντων**: Προσθήκη, επεξεργασία και διαγραφή προϊόντων
- **Διαχείριση Κατηγοριών**: Οργάνωση προϊόντων σε κατηγορίες
- **Διαχείριση Πολυμέσων**: Ανέβασμα και διαχείριση εικόνων μέσω του Cloudinary
- **Αυθεντικοποίηση**: Βασικό σύστημα login (για ανάπτυξη)
- **API**: RESTful API για όλες τις λειτουργίες του συστήματος

## Τεχνολογίες

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Διαχείριση Εικόνων**: Cloudinary
- **Styling**: Tailwind CSS

## Εγκατάσταση

1. Κλωνοποιήστε το repository:
   ```
   git clone https://github.com/yourusername/aion-cms.git
   cd aion-cms
   ```

2. Εγκαταστήστε τις εξαρτήσεις:
   ```
   npm install
   ```

3. Δημιουργήστε ένα αρχείο `.env.local` με τις ακόλουθες μεταβλητές:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. Εκκινήστε τον development server:
   ```
   npm run dev
   ```

5. Ανοίξτε το [http://localhost:3000](http://localhost:3000) στον browser σας.

## Χρήση

### Login

- Για να συνδεθείτε στο διαχειριστικό panel, χρησιμοποιήστε:
  - Username: `admin`
  - Password: `admin`

### Διαχείριση Προϊόντων

- Προβολή όλων των προϊόντων: `/products`
- Προσθήκη νέου προϊόντος: `/products/new`
- Επεξεργασία προϊόντος: `/products/edit/[id]`

### Διαχείριση Κατηγοριών

- Προβολή όλων των κατηγοριών: `/categories`
- Προσθήκη νέας κατηγορίας: `/categories/new`
- Επεξεργασία κατηγορίας: `/categories/edit/[id]`

### Διαχείριση Πολυμέσων

- Προβολή βιβλιοθήκης πολυμέσων: `/media`
- Ανέβασμα νέων εικόνων: Χρησιμοποιήστε το κουμπί "Upload Files" στη σελίδα `/media`

## API Endpoints

### Προϊόντα

- `GET /api/products`: Ανάκτηση όλων των προϊόντων
- `POST /api/products`: Δημιουργία νέου προϊόντος
- `GET /api/products/[id]`: Ανάκτηση συγκεκριμένου προϊόντος
- `PUT /api/products/[id]`: Ενημέρωση συγκεκριμένου προϊόντος
- `DELETE /api/products/[id]`: Διαγραφή συγκεκριμένου προϊόντος

### Κατηγορίες

- `GET /api/categories`: Ανάκτηση όλων των κατηγοριών
- `POST /api/categories`: Δημιουργία νέας κατηγορίας
- `GET /api/categories/[id]`: Ανάκτηση συγκεκριμένης κατηγορίας
- `PUT /api/categories/[id]`: Ενημέρωση συγκεκριμένης κατηγορίας
- `DELETE /api/categories/[id]`: Διαγραφή συγκεκριμένης κατηγορίας

### Πολυμέσα

- `GET /api/media`: Ανάκτηση όλων των εικόνων
- `POST /api/media/upload`: Ανέβασμα νέας εικόνας
- `DELETE /api/media/[publicId]`: Διαγραφή συγκεκριμένης εικόνας

## Μελλοντικές βελτιώσεις

- Ενσωμάτωση πραγματικής βάσης δεδομένων (MongoDB, PostgreSQL)
- Προσθήκη πιο ασφαλούς συστήματος αυθεντικοποίησης (π.χ. NextAuth.js)
- Ενσωμάτωση προηγμένων λειτουργιών επεξεργασίας εικόνων
- Υποστήριξη για άλλους τύπους περιεχομένου (blog posts, σελίδες)
- Βελτιωμένο UI/UX
