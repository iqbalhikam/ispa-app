import jsPDF from 'jspdf';
import { DiagnosisResult } from './certaintyFactor';

interface UserData {
  name: string;
  age: string;
  gender: string;
}

export const generatePDF = (userData: UserData, results: DiagnosisResult[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let currentY = 20;

  // Helper for centered text
  const centerText = (text: string, y: number, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  // 1. Header
  centerText('SISTEM PAKAR DIAGNOSA ISPA', currentY, 18, true);
  currentY += 10;
  centerText('LAPORAN HASIL DIAGNOSA', currentY, 14, true);
  currentY += 5;

  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, currentY + 5, pageWidth - 20, currentY + 5);
  currentY += 15;

  // 2. Patient Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Data Pasien:', 20, currentY);
  currentY += 8;

  doc.setFontSize(11);
  doc.text(`Nama             : ${userData.name}`, 25, currentY);
  currentY += 6;
  doc.text(`Umur             : ${userData.age} Tahun`, 25, currentY);
  currentY += 6;
  doc.text(`Jenis Kelamin : ${userData.gender}`, 25, currentY);
  currentY += 6;
  doc.text(`Tanggal         : ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, 25, currentY);

  currentY += 15;

  // 3. Results
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Hasil Analisa:', 20, currentY);
  currentY += 10;

  if (results.length > 0) {
    results.forEach((result, index) => {
      // Check for page break
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = 20;
      }

      // Disease Name Box
      doc.setFillColor(index === 0 ? 37 : 240, index === 0 ? 99 : 240, index === 0 ? 235 : 240); // Blue for top, Gray for others
      doc.setDrawColor(200, 200, 200);
      doc.rect(20, currentY, pageWidth - 40, 12, 'FD');

      doc.setTextColor(index === 0 ? 255 : 0, index === 0 ? 255 : 0, index === 0 ? 255 : 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(result.disease.name, 25, currentY + 8);

      const percentageText = `${result.percentage.toFixed(2)}%`;
      doc.text(percentageText, pageWidth - 25 - doc.getTextWidth(percentageText), currentY + 8);

      currentY += 12;
      doc.setTextColor(0, 0, 0); // Reset color

      // Content Box
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(255, 255, 255);
      // We don't draw a rect for content, just text

      currentY += 8;

      // Description
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Deskripsi:', 25, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(result.disease.description, pageWidth - 50);
      doc.text(descLines, 25, currentY);
      currentY += descLines.length * 5 + 5;

      // Treatment
      doc.setFont('helvetica', 'bold');
      doc.text('Saran Pengobatan:', 25, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'normal');
      const treatLines = doc.splitTextToSize(result.disease.treatment, pageWidth - 50);
      doc.text(treatLines, 25, currentY);
      currentY += treatLines.length * 5 + 10;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.text('Tidak ada penyakit yang terdeteksi dengan tingkat keyakinan yang memadai.', 25, currentY);
  }

  // Footer
  const footerY = pageHeight - 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Dokumen ini dihasilkan secara otomatis oleh Sistem Pakar ISPA.', 20, footerY);
  doc.text('Bukan pengganti konsultasi medis profesional.', 20, footerY + 5);

  doc.save(`Hasil_Diagnosa_${userData.name.replace(/\s+/g, '_')}.pdf`);
};
