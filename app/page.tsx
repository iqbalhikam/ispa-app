'use client';

import { useState } from 'react';
import { symptoms } from '@/data/knowledgeBase';
import { calculateCertainty, DiagnosisResult, UserInput } from '@/utils/certaintyFactor';

export default function Home() {
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);

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
  };

  const resetForm = () => {
    setInputs({});
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl mb-4">Diagnosa Mandiri ISPA</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Sistem Pakar menggunakan metode Certainty Factor untuk mendeteksi Infeksi Saluran Pernapasan Akut berdasarkan gejala yang Anda alami.</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          <div className="p-8 bg-slate-800 text-white">
            <h2 className="text-2xl font-bold">Formulir Gejala</h2>
            <p className="opacity-80">Silakan pilih tingkat keyakinan Anda untuk setiap gejala berikut.</p>
          </div>

          <div className="p-8 space-y-6">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors px-4 rounded-lg">
                <label htmlFor={`symptom-${symptom.id}`} className="block text-lg font-medium text-slate-700 mb-2 sm:mb-0 flex-1">
                  {symptom.code} - {symptom.name}
                </label>
                <div className="sm:w-64">
                  <select
                    id={`symptom-${symptom.id}`}
                    value={inputs[symptom.id] ?? 0}
                    onChange={(e) => handleInputChange(symptom.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm text-slate-700 bg-white">
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

          <div className="bg-slate-50 px-8 py-6 flex justify-end items-center gap-4">
            <button onClick={resetForm} className="text-slate-600 hover:text-slate-800 font-medium px-4 py-2">
              Reset
            </button>
            <button
              onClick={handleDiagnose}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105">
              Diagnosa Sekarang
            </button>
          </div>
        </div>

        {results && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-3xl font-bold text-slate-800 border-b pb-4">Hasil Diagnosa</h3>

            {results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((result, index) => (
                  <div key={result.disease.id} className={`rounded-xl overflow-hidden shadow-lg border ${index === 0 ? 'border-blue-200 ring-2 ring-blue-500 ring-offset-2' : 'border-slate-100'}`}>
                    <div className={`${index === 0 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-white text-slate-800'} p-6`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-2xl font-bold">{result.disease.name}</h4>
                        <span className={`text-2xl font-extrabold ${index === 0 ? 'text-white' : 'text-blue-600'}`}>{result.percentage.toFixed(2)}%</span>
                      </div>
                      <p className={`text-sm ${index === 0 ? 'text-blue-100' : 'text-slate-500'}`}>
                        Kode: {result.disease.code} | Tingkat Kepercayaan: {result.percentage.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-white p-6 space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">Deskripsi</h5>
                        <p className="text-slate-700 leading-relaxed">{result.disease.description}</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-green-700 mb-1 flex items-center gap-2">
                          <span className="text-lg">💊</span> Saran Pengobatan
                        </h5>
                        <p className="text-slate-700 leading-relaxed">{result.disease.treatment}</p>
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
                    <p className="text-sm text-yellow-700">Tidak ada penyakit yang terdeteksi dengan tingkat keyakinan yang memadai. Cobalah memilih gejala dengan tingkat keyakinan yang lebih tinggi atau konsultasikan dengan dokter.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
