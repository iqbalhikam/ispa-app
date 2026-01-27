'use client';

import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function Home() {
  const { userData, setUserData } = useApp();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleStartDiagnosis = (e: FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.age) {
      router.push('/diagnosa');
    }
  };

  return (
    <>
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight sm:text-5xl mb-4">Diagnosa Mandiri ISPA</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Sistem Pakar menggunakan metode Certainty Factor untuk mendeteksi Infeksi Saluran Pernapasan Akut.</p>
          </div>

          {/* Step 1: User Data Input */}
          <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500 transition-colors duration-300">
            <div className="p-8 bg-blue-600 dark:bg-blue-700 text-white">
              <h2 className="text-2xl font-bold">Data Diri Pasien</h2>
              <p className="opacity-90">Masukan data diri Anda sebelum memulai diagnosa.</p>
            </div>
            <form onSubmit={handleStartDiagnosis} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={userData.name}
                  onChange={handleUserChange}
                  className="block w-full px-4 py-3 rounded-lg text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Umur (Tahun)</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="0"
                    value={userData.age}
                    onChange={handleUserChange}
                    className="block w-full px-4 py-3 rounded-lg text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleUserChange}
                    className="block text-slate-700 dark:text-slate-200 w-full px-4 py-3 rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 dark:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95">
                  Lanjut ke Diagnosa &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
