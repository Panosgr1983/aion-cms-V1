'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Απλός έλεγχος διαπιστευτηρίων (μόνο για εκπαιδευτικούς σκοπούς)
    if (username === 'admin' && password === 'admin123') {
      // Αποθήκευση κατάστασης σύνδεσης
      localStorage.setItem('isLoggedIn', 'true');
      // Ανακατεύθυνση στο dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Λάθος όνομα χρήστη ή κωδικός πρόσβασης');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">AION CMS</h1>
        <h2 className="text-xl mb-6 text-center">Σύνδεση</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Όνομα χρήστη
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Κωδικός πρόσβασης
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Σύνδεση
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Για δοκιμή: username: admin, password: admin123</p>
        </div>
      </div>
    </div>
  );
}
