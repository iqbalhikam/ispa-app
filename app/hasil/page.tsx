'use client';

import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { generatePDF } from '@/utils/pdfGenerator';

export default function HasilPage() {
  const { userData, diagnosisResults, resetAll } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!diagnosisResults) {
      router.replace('/');
    }
  }, [diagnosisResults, router]);

  const handlePrint = () => {
    if (userData && diagnosisResults) {
      generatePDF(userData, diagnosisResults);
    }
  };

  const handleRestart = () => {
    router.replace('/diagnosa');
  };

  if (!diagnosisResults) return null;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto print:max-w-none print:mx-0">
        <div className="space-y-8 animate-in zoom-in duration-500">
          {/* Header Result for Print */}
          <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4">
            <h1 className="text-3xl font-bold mb-2">Laporan Hasil Diagnosa ISPA</h1>
            <p className="text-sm">Tanggal: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Patient Info Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border-l-4 border-blue-600 dark:border-blue-500 print:shadow-none print:border transition-colors duration-300">
            <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Data Pasien</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="block text-xs text-slate-400 dark:text-slate-500">Nama</span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{userData.name}</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 dark:text-slate-500">Umur</span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{userData.age} Tahun</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 dark:text-slate-500">Jenis Kelamin</span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{userData.gender}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center print:hidden">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Hasil Analisa</h3>
            <div className="flex gap-3">
              <button onClick={handleRestart} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Ulangi Diagnosa
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-800 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-slate-900 dark:hover:bg-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Unduh Laporan PDF
              </button>
            </div>
          </div>

          {diagnosisResults.length > 0 ? (
            <div className="grid gap-6">
              {diagnosisResults.map((result, index) => (
                <div
                  key={result.disease.id}
                  className={`rounded-xl overflow-hidden shadow-lg border print:shadow-none print:border-black ${index === 0 ? 'border-blue-200 dark:border-blue-800 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 print:ring-0' : 'border-slate-100 dark:border-slate-800'} transition-all duration-300`}>
                  <div className={`${index === 0 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white print:bg-none print:text-black print:border-b' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100'} p-6`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-2xl font-bold">{result.disease.name}</h4>
                      <span className={`text-2xl font-extrabold ${index === 0 ? 'text-white print:text-black' : 'text-blue-600 dark:text-blue-400 print:text-black'}`}>{result.percentage.toFixed(2)}%</span>
                    </div>
                    <p className={`text-sm ${index === 0 ? 'text-blue-100 print:text-black' : 'text-slate-500 dark:text-slate-400'}`}>
                      Kode: {result.disease.code} | Tingkat Kepercayaan Sistem: {result.percentage.toFixed(2)}%
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-6 space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Deskripsi</h5>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-left">{result.disease.description}</p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800 print:bg-white print:border-slate-300">
                      <h5 className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400 mb-1 flex items-center gap-2 print:text-black">
                        <span className="text-lg">💊</span> Saran Pengobatan
                      </h5>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-left">{result.disease.treatment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">Tidak ada penyakit yang terdeteksi dengan tingkat keyakinan yang memadai.</p>
                </div>
              </div>
            </div>
          )}

          <div className="hidden print:block mt-12 pt-8 border-t border-slate-300 text-center text-sm text-slate-500">
            <p>Dicetak otomatis oleh Sistem Pakar ISPA</p>
            <p>ini bukan pengganti konsultasi medis profesional. Segera hubungi dokter jika gejala berlanjut.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
