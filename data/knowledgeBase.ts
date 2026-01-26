export interface Disease {
  id: string;
  code: string;
  name: string;
  description: string;
  treatment: string;
}

export interface Symptom {
  id: string;
  code: string;
  name: string;
}

export interface Rule {
  disease_id: string;
  symptom_id: string;
  cf_expert: number;
}

export const diseases: Disease[] = [
  {
    id: '1',
    code: 'P01',
    name: 'Influenza (Flu)',
    description: 'Infeksi virus yang menyerang sistem pernapasan (hidung, tenggorokan, dan paru-paru). Gejala muncul tiba-tiba dan bisa berlangsung 1-2 minggu.',
    treatment: 'Istirahat total, perbanyak minum air putih, konsumsi obat penurun panas (parasetamol), dekongestan, dan suplemen vitamin C & Zinc. Segera ke dokter jika sesak napas atau demam >3 hari.',
  },
  {
    id: '2',
    code: 'P02',
    name: 'Bronkitis Akut',
    description: 'Peradangan pada saluran bronkus (saluran udara ke paru-paru), biasanya disebabkan oleh virus. Sering ditandai dengan batuk yang menetap beberapa minggu.',
    treatment: 'Hindari asap rokok/polusi, gunakan humidifier, minum air hangat, obat batuk (ekspektoran/mukolitik). Antibiotik HANYA jika ada indikasi infeksi bakteri sekunder.',
  },
  {
    id: '3',
    code: 'P03',
    name: 'Pneumonia (Paru-paru Basah)',
    description: 'Infeksi yang meradang pada kantung udara di satu atau kedua paru-paru, yang dapat berisi cairan atau nanah. Kondisi ini serius dan butuh penanganan segera.',
    treatment: 'SEGERA KE RUMAH SAKIT. Membutuhkan antibiotik (jika bakteri), obat antivirus (jika virus flu berat), terapi oksigen, dan istirahat total. Pantau saturasi oksigen.',
  },
  {
    id: '4',
    code: 'P04',
    name: 'Sinusitis Akut',
    description: 'Peradangan atau pembengkakan pada jaringan yang melapisi sinus. Menyebabkan lendir menumpuk dan hidung tersumbat.',
    treatment: 'Irigasi hidung (cuci hidung) dengan larutan saline, kortikosteroid nasal spray, dekongestan, kompres hangat di wajah. Antibiotik jika gejala >10 hari tanpa perbaikan.',
  },
];

export const symptoms: Symptom[] = [
  { id: '1', code: 'G01', name: 'Demam Tinggi (>38°C)' },
  { id: '2', code: 'G02', name: 'Demam Ringan / Sumeng' },
  { id: '3', code: 'G03', name: 'Batuk Kering' },
  { id: '4', code: 'G04', name: 'Batuk Berdahak (Hijau/Kuning)' },
  { id: '5', code: 'G05', name: 'Pilek / Hidung Tersumbat' },
  { id: '6', code: 'G06', name: 'Ingus Kental / Berwarna' },
  { id: '7', code: 'G07', name: 'Sakit Tenggorokan' },
  { id: '8', code: 'G08', name: 'Sesak Napas / Kesulitan Bernapas' },
  { id: '9', code: 'G09', name: 'Napas Cepat (Tachypnea)' },
  { id: '10', code: 'G10', name: 'Nyeri Dada saat Bernapas/Batuk' },
  { id: '11', code: 'G11', name: 'Nyeri Otot / Pegal Linu di Seluruh Tubuh' },
  { id: '12', code: 'G12', name: 'Sakit Kepala' },
  { id: '13', code: 'G13', name: 'Lemas / Kelelahan Ekstrem' },
  { id: '14', code: 'G14', name: 'Nyeri/Tekanan pada Wajah (Pipi/Dahi)' },
  { id: '15', code: 'G15', name: 'Menggigil' },
];

export const rules: Rule[] = [
  // --- Influenza (P01) ---
  // Gejala Khas: Demam tinggi mendadak, nyeri otot, lemas
  { disease_id: '1', symptom_id: '1', cf_expert: 0.8 }, // Demam Tinggi
  { disease_id: '1', symptom_id: '11', cf_expert: 0.9 }, // Nyeri Otot (Signifikan)
  { disease_id: '1', symptom_id: '13', cf_expert: 0.8 }, // Lemas
  { disease_id: '1', symptom_id: '3', cf_expert: 0.6 }, // Batuk Kering
  { disease_id: '1', symptom_id: '12', cf_expert: 0.7 }, // Sakit Kepala
  { disease_id: '1', symptom_id: '15', cf_expert: 0.8 }, // Menggigil
  { disease_id: '1', symptom_id: '5', cf_expert: 0.4 }, // Pilek (Umum)

  // --- Bronkitis Akut (P02) ---
  // Gejala Khas: Batuk persisten (sering berdahak), rasa tidak nyaman di dada
  { disease_id: '2', symptom_id: '4', cf_expert: 0.9 }, // Batuk Berdahak
  { disease_id: '2', symptom_id: '10', cf_expert: 0.6 }, // Nyeri Dada (ringan/rasa terbakar)
  { disease_id: '2', symptom_id: '2', cf_expert: 0.5 }, // Demam Ringan
  { disease_id: '2', symptom_id: '13', cf_expert: 0.4 }, // Lemas
  { disease_id: '2', symptom_id: '7', cf_expert: 0.5 }, // Sakit Tenggorokan
  { disease_id: '2', symptom_id: '5', cf_expert: 0.4 }, // Pilek

  // --- Pneumonia (P03) ---
  // Gejala Khas: Sesak napas, nyeri dada tajam, demam tinggi, napas cepat
  { disease_id: '3', symptom_id: '8', cf_expert: 0.9 }, // Sesak Napas (Kritis)
  { disease_id: '3', symptom_id: '9', cf_expert: 0.85 }, // Napas Cepat
  { disease_id: '3', symptom_id: '1', cf_expert: 0.8 }, // Demam Tinggi
  { disease_id: '3', symptom_id: '10', cf_expert: 0.8 }, // Nyeri Dada (Tajam)
  { disease_id: '3', symptom_id: '4', cf_expert: 0.7 }, // Batuk Berdahak
  { disease_id: '3', symptom_id: '15', cf_expert: 0.7 }, // Menggigil
  { disease_id: '3', symptom_id: '13', cf_expert: 0.6 }, // Lemas

  // --- Sinusitis Akut (P04) ---
  // Gejala Khas: Nyeri wajah, ingus kental, hidung tersumbat
  { disease_id: '4', symptom_id: '14', cf_expert: 0.9 }, // Nyeri Wajah (Spesifik)
  { disease_id: '4', symptom_id: '6', cf_expert: 0.85 }, // Ingus Kental
  { disease_id: '4', symptom_id: '5', cf_expert: 0.7 }, // Hidung Tersumbat
  { disease_id: '4', symptom_id: '12', cf_expert: 0.6 }, // Sakit Kepala
  { disease_id: '4', symptom_id: '4', cf_expert: 0.4 }, // Batuk (Post-nasal drip)
  { disease_id: '4', symptom_id: '2', cf_expert: 0.4 }, // Demam Ringan
];
