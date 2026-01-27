'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DiagnosisResult } from '@/utils/certaintyFactor';

interface UserData {
  name: string;
  age: string;
  gender: string;
}

interface AppContextType {
  userData: UserData;
  setUserData: (data: UserData) => void;
  diagnosisResults: DiagnosisResult[] | null;
  setDiagnosisResults: (results: DiagnosisResult[] | null) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    gender: 'Laki-laki',
  });
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[] | null>(null);

  const resetAll = () => {
    setUserData({ name: '', age: '', gender: 'Laki-laki' });
    setDiagnosisResults(null);
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        diagnosisResults,
        setDiagnosisResults,
        resetAll,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
