'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { symptoms } from '@/data/knowledgeBase';
import { calculateCertainty, UserInput } from '@/utils/certaintyFactor';

export default function DignosaPage() {
  const { userData, resetAll, setDiagnosisResults } = useApp();
  const router = useRouter();
  const [inputs, setInputs] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!userData.name || !userData.age) {
      router.replace('/');
    }
  }, [userData, router]);

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

    const results = calculateCertainty(userInputs);
    setDiagnosisResults(results);
    router.push('/hasil');
  };

  const handleReset = () => {
    setInputs({});
  };

  const handleBack = () => {
    resetAll();
    router.replace('/');
  };

  if (!userData.name) {
    return null; // or a loading spinner
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right duration-500 transition-colors duration-300">
          <div className="p-6 bg-slate-800 dark:bg-slate-900 text-white flex justify-between items-center border-b border-slate-700">
            <div>
              <h2 className="text-xl font-bold">Formulir Gejala</h2>
              <p className="text-sm opacity-80">
                Halo, {userData.name} ({userData.age} th)
              </p>
            </div>
            <button onClick={handleBack} className="text-xs bg-slate-700 dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-700 px-3 py-1 rounded transition-colors">
              Ganti Pasien
            </button>
          </div>

          <div className="p-8 space-y-6">
            {symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors px-4 rounded-lg">
                <label htmlFor={`symptom-${symptom.id}`} className="block text-lg font-medium text-slate-700 dark:text-slate-200 mb-2 sm:mb-0 flex-1 cursor-pointer">
                  {symptom.code} - {symptom.name}
                </label>
                <div className="sm:w-64">
                  <select
                    id={`symptom-${symptom.id}`}
                    value={inputs[symptom.id] ?? 0}
                    onChange={(e) => handleInputChange(symptom.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:border-blue-400 transition-colors cursor-pointer">
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

          <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 flex justify-between items-center">
            <button onClick={handleBack} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm">
              &larr; Kembali
            </button>
            <div className="flex gap-4">
              <button onClick={handleReset} className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white font-medium px-4 py-2">
                Reset Pilihan
              </button>
              <button
                onClick={handleDiagnose}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105">
                Analisa Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
