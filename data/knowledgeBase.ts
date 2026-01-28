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

export interface UserOption {
  id: string;
  label: string;
  value: number;
}

export const diseases: Disease[] = [
  {
    id: '1',
    code: 'P01',
    name: 'Sinusitis',
    description: 'Peradangan atau pembengkakan pada jaringan yang melapisi sinus. Menyebabkan lendir menumpuk dan hidung tersumbat.',
    treatment: 'Irigasi hidung (cuci hidung) dengan larutan saline, kortikosteroid nasal spray, dekongestan, kompres hangat di wajah. Antibiotik jika gejala >10 hari tanpa perbaikan.',
  },
  {
    id: '2',
    code: 'P02',
    name: 'Pneumonia',
    description: 'Infeksi yang meradang pada kantung udara di satu atau kedua paru-paru, yang dapat berisi cairan atau nanah. Kondisi ini serius dan butuh penanganan segera.',
    treatment: 'SEGERA KE RUMAH SAKIT. Membutuhkan antibiotik (jika bakteri), obat antivirus (jika virus flu berat), terapi oksigen, dan istirahat total. Pantau saturasi oksigen.',
  },
  {
    id: '3',
    code: 'P03',
    name: 'Faringitis',
    description: 'Peradangan pada faring (tenggorokan), sering disebut radang tenggorokan. Biasanya disebabkan oleh infeksi virus atau bakteri.',
    treatment: 'Istirahat yang cukup, perbanyak minum air putih, berkumur dengan air garam hangat, konsumsi permen pelega tenggorokan, dan obat pereda nyeri jika diperlukan.',
  },
  {
    id: '4',
    code: 'P04',
    name: 'Asma',
    description: 'Penyakit kronis pada saluran pernapasan yang ditandai dengan peradangan dan penyempitan saluran napas, menyebabkan sesak napas dan mengi.',
    treatment: 'Hindari pemicu alergi/asma. Gunakan inhaler (bronkodilator) untuk meredakan serangan akut, dan inhaler pengontrol (kortikosteroid) untuk jangka panjang sesuai resep dokter.',
  },
];

export const symptoms: Symptom[] = [
  { id: '1', code: 'G01', name: 'Tekanan atau rasa sakit di area wajah' },
  { id: '2', code: 'G02', name: 'Hidung tersumbat atau pilek' },
  { id: '3', code: 'G03', name: 'Pusing atau sakit kepala' },
  { id: '4', code: 'G04', name: 'Batuk' },
  { id: '5', code: 'G05', name: 'Hilangnya indra penciuman dan indra perasa' },
  { id: '6', code: 'G06', name: 'Demam rendah' },
  { id: '7', code: 'G07', name: 'Bau mulut (halitosis)' },
  { id: '8', code: 'G08', name: 'Sakit tenggorokan' },
  { id: '9', code: 'G09', name: 'Diare' },
  { id: '10', code: 'G10', name: 'Demam tinggi' },
  { id: '11', code: 'G11', name: 'Kesulitan bernapas (napas pendek)' },
  { id: '12', code: 'G12', name: 'Nyeri dada yang memburuk saat bernapas dalam' },
  { id: '13', code: 'G13', name: 'Kehilangan nafsu makan' },
  { id: '14', code: 'G14', name: 'Kelelahan dan rasa sakit tubuh secara umum' },
  { id: '15', code: 'G15', name: 'Muntah' },
  { id: '16', code: 'G16', name: 'Pembengkakan kelenjar getah bening' },
  { id: '17', code: 'G17', name: 'Kemerahan dan pembengkakan' },
  { id: '18', code: 'G18', name: 'Sulit menelan' },
  { id: '19', code: 'G19', name: 'Batuk kering atau batuk dengan dahak ringan' },
  { id: '20', code: 'G20', name: 'Suara serak atau hilangnya suara' },
  { id: '21', code: 'G21', name: 'Nyeri telinga' },
  { id: '22', code: 'G22', name: 'Sesak napas' },
  { id: '23', code: 'G23', name: 'Pernapasan cepat' },
  { id: '24', code: 'G24', name: 'Mengi (suara napas)' },
  { id: '25', code: 'G25', name: 'Kelelahan' },
  { id: '26', code: 'G26', name: 'Peningkatan denyut jantung' },
];

export const rules: Rule[] = [
  // --- Sinusitis (P01) ---
  { disease_id: '1', symptom_id: '1', cf_expert: 0.6 }, // G01
  { disease_id: '1', symptom_id: '2', cf_expert: 1.0 }, // G02
  { disease_id: '1', symptom_id: '3', cf_expert: 0.6 }, // G03
  { disease_id: '1', symptom_id: '4', cf_expert: 0.4 }, // G04
  { disease_id: '1', symptom_id: '5', cf_expert: 0.9 }, // G05
  { disease_id: '1', symptom_id: '6', cf_expert: 0.2 }, // G06
  { disease_id: '1', symptom_id: '7', cf_expert: 0.2 }, // G07
  { disease_id: '1', symptom_id: '8', cf_expert: 0.2 }, // G08

  // --- Pneumonia (P02) ---
  { disease_id: '2', symptom_id: '4', cf_expert: 0.4 }, // G04
  { disease_id: '2', symptom_id: '8', cf_expert: 0.2 }, // G08
  { disease_id: '2', symptom_id: '9', cf_expert: 0.2 }, // G09
  { disease_id: '2', symptom_id: '10', cf_expert: 0.6 }, // G10
  { disease_id: '2', symptom_id: '11', cf_expert: 0.8 }, // G11
  { disease_id: '2', symptom_id: '12', cf_expert: 0.4 }, // G12
  { disease_id: '2', symptom_id: '13', cf_expert: 0.6 }, // G13
  { disease_id: '2', symptom_id: '14', cf_expert: 0.4 }, // G14
  { disease_id: '2', symptom_id: '15', cf_expert: 0.2 }, // G15

  // --- Faringitis (P03) ---
  { disease_id: '3', symptom_id: '3', cf_expert: 0.6 }, // G03
  { disease_id: '3', symptom_id: '4', cf_expert: 0.4 }, // G04
  { disease_id: '3', symptom_id: '6', cf_expert: 0.2 }, // G06
  { disease_id: '3', symptom_id: '7', cf_expert: 0.2 }, // G07
  { disease_id: '3', symptom_id: '8', cf_expert: 0.2 }, // G08
  { disease_id: '3', symptom_id: '14', cf_expert: 0.4 }, // G14
  { disease_id: '3', symptom_id: '15', cf_expert: 0.2 }, // G15
  { disease_id: '3', symptom_id: '16', cf_expert: 0.4 }, // G16
  { disease_id: '3', symptom_id: '17', cf_expert: 0.8 }, // G17
  { disease_id: '3', symptom_id: '18', cf_expert: 0.8 }, // G18
  { disease_id: '3', symptom_id: '19', cf_expert: 0.4 }, // G19
  { disease_id: '3', symptom_id: '20', cf_expert: 0.4 }, // G20
  { disease_id: '3', symptom_id: '21', cf_expert: 0.2 }, // G21

  // --- Asma (P04) ---
  { disease_id: '4', symptom_id: '4', cf_expert: 0.4 }, // G04
  { disease_id: '4', symptom_id: '12', cf_expert: 0.4 }, // G12
  { disease_id: '4', symptom_id: '22', cf_expert: 1.0 }, // G22
  { disease_id: '4', symptom_id: '23', cf_expert: 0.6 }, // G23
  { disease_id: '4', symptom_id: '24', cf_expert: 0.9 }, // G24
  { disease_id: '4', symptom_id: '25', cf_expert: 0.6 }, // G25
  { disease_id: '4', symptom_id: '26', cf_expert: 0.4 }, // G26
];

export const userOptions: UserOption[] = [
  { id: '1', label: 'Tidak Tahu', value: 0 },
  { id: '2', label: 'Tidak Yakin', value: 0.2 },
  { id: '3', label: 'Sedikit Yakin', value: 0.4 },
  { id: '4', label: 'Cukup Yakin', value: 0.6 },
  { id: '5', label: 'Yakin', value: 0.8 },
  { id: '6', label: 'Sangat Yakin', value: 1.0 },
];
