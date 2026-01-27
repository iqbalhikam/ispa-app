'use client';

import { useState } from 'react';
import { symptoms } from '@/data/knowledgeBase';
import { calculateCertainty, DiagnosisResult, UserInput } from '@/utils/certaintyFactor';

export default function Home() {
  const [step, setStep] = useState<'input' | 'diagnosis' | 'result'>('input');
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: 'Laki-laki',
  });
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.age) {
      setStep('diagnosis');
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (symptomId: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [symptomId]: parseFloat(value),
    }));
  };

  const handleDiagnose = () => {
    const userInputs: UserInput[] = Object.entries(inputs).map(([id, cf]) => ({
      symptom_id: id,
      cf_user: cf,
    }));

    const diagnosisResults = calculateCertainty(userInputs);
    setResults(diagnosisResults);
    setStep('result');
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setInputs({});
    setResults(null);
    setStep('diagnosis');
    window.scrollTo(0, 0);
  };

  const fullReset = () => {
    setUserData({ name: '', age: '', gender: 'Laki-laki' });
    setInputs({});
    setResults(null);
    setStep('input');
    window.scrollTo(0, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto print:max-w-none print:mx-0">
        <div className="text-center mb-12 print:hidden">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl mb-4">Diagnosa Mandiri ISPA</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Sistem Pakar menggunakan metode Certainty Factor untuk mendeteksi Infeksi Saluran Pernapasan Akut.</p>
        </div>

        {/* Step 1: User Data Input */}
        {step === 'input' && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100 max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
            <div className="p-8 bg-blue-600 text-white">
              <h2 className="text-2xl font-bold">Data Diri Pasien</h2>
              <p className="opacity-90">Masukan data diri Anda sebelum memulai diagnosa.</p>
            </div>
            <form onSubmit={handleStartDiagnosis} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={userData.name}
                  onChange={handleUserChange}
                  className="block w-full px-4 py-3 rounded-lg border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Umur (Tahun)</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="0"
                    value={userData.age}
                    onChange={handleUserChange}
                    className="block w-full px-4 py-3 rounded-lg border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleUserChange}
                    className="block w-full px-4 py-3 rounded-lg border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95">
                  Lanjut ke Diagnosa &rarr;
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Symptom Assessment */}
        {step === 'diagnosis' && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100 animate-in slide-in-from-right duration-500">
            <div className="p-6 bg-slate-800 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Formulir Gejala</h2>
                <p className="text-sm opacity-80">
                  Halo, {userData.name} ({userData.age} th)
                </p>
              </div>
              <button onClick={fullReset} className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors">
                Ganti Pasien
              </button>
            </div>

            <div className="p-8 space-y-6">
              {symptoms.map((symptom) => (
                <div key={symptom.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-4 rounded-lg">
                  <label htmlFor={`symptom-${symptom.id}`} className="block text-lg font-medium text-slate-700 mb-2 sm:mb-0 flex-1 cursor-pointer">
                    {symptom.code} - {symptom.name}
                  </label>
                  <div className="sm:w-64">
                    <select
                      id={`symptom-${symptom.id}`}
                      value={inputs[symptom.id] ?? 0}
                      onChange={(e) => handleInputChange(symptom.id, e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm text-slate-700 bg-white hover:border-blue-400 transition-colors cursor-pointer">
                      <option value="0">Tidak Yakin (0)</option>
                      <option value="0.4">Sedikit Yakin (0.4)</option>
                      <option value="0.6">Cukup Yakin (0.6)</option>
                      <option value="0.8">Yakin (0.8)</option>
                      <option value="1">Sangat Yakin (1.0)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 px-8 py-6 flex justify-between items-center">
              <button onClick={fullReset} className="text-slate-500 hover:text-slate-800 text-sm">
                &larr; Kembali
              </button>
              <div className="flex gap-4">
                <button onClick={() => setInputs({})} className="text-slate-600 hover:text-slate-800 font-medium px-4 py-2">
                  Reset Pilihan
                </button>
                <button
                  onClick={handleDiagnose}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105">
                  Analisa Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Diagnosis Results */}
        {step === 'result' && results && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            {/* Header Result for Print */}
            <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="text-3xl font-bold mb-2">Laporan Hasil Diagnosa ISPA</h1>
              <p className="text-sm">Tanggal: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Patient Info Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 print:shadow-none print:border">
              <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-4">Data Pasien</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="block text-xs text-slate-400">Nama</span>
                  <span className="text-xl font-bold text-slate-800">{userData.name}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Umur</span>
                  <span className="text-xl font-bold text-slate-800">{userData.age} Tahun</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Jenis Kelamin</span>
                  <span className="text-xl font-bold text-slate-800">{userData.gender}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center print:hidden">
              <h3 className="text-2xl font-bold text-slate-800">Hasil Analisa</h3>
              <div className="flex gap-3">
                <button onClick={resetForm} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  Ulangi Diagnosa
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2-4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Cetak / Simpan PDF
                </button>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((result, index) => (
                  <div
                    key={result.disease.id}
                    className={`rounded-xl overflow-hidden shadow-lg border print:shadow-none print:border-black ${index === 0 ? 'border-blue-200 ring-2 ring-blue-500 ring-offset-2 print:ring-0' : 'border-slate-100'}`}>
                    <div className={`${index === 0 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white print:bg-none print:text-black print:border-b' : 'bg-white text-slate-800'} p-6`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-2xl font-bold">{result.disease.name}</h4>
                        <span className={`text-2xl font-extrabold ${index === 0 ? 'text-white print:text-black' : 'text-blue-600 print:text-black'}`}>{result.percentage.toFixed(2)}%</span>
                      </div>
                      <p className={`text-sm ${index === 0 ? 'text-blue-100 print:text-black' : 'text-slate-500'}`}>
                        Kode: {result.disease.code} | Tingkat Kepercayaan Sistem: {result.percentage.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-white p-6 space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">Deskripsi</h5>
                        <p className="text-slate-700 leading-relaxed text-justify">{result.disease.description}</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-100 print:bg-white print:border-slate-300">
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-green-700 mb-1 flex items-center gap-2 print:text-black">
                          <span className="text-lg">💊</span> Saran Pengobatan
                        </h5>
                        <p className="text-slate-700 leading-relaxed text-justify">{result.disease.treatment}</p>
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
        )}
      </div>
    </main>
  );
}
