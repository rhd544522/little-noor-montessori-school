import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SubmissionRecord } from '../types';

function getFormattedDateStamp(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}${mm}${dd}_${hh}${min}`;
}

export function exportToExcel(submissions: SubmissionRecord[], filterLabel = 'All') {
  if (!submissions || submissions.length === 0) {
    alert('No submissions available to export.');
    return;
  }

  const rows = submissions.map((sub, idx) => ({
    '#': idx + 1,
    'Submission ID': sub.id || 'N/A',
    'Date & Time': sub.submittedAt || 'N/A',
    'Request Type': (sub.type || 'enquiry').toUpperCase(),
    'Parent Name': sub.parentName || '',
    'Contact Number': sub.phone || '',
    'Email Address': sub.email || 'N/A',
    'Program of Interest': sub.program || (sub.type === 'enrollment' ? sub.preferredSlot : 'N/A') || 'N/A',
    'Child Name & Age': sub.childName
      ? `${sub.childName}${sub.childAge ? ` (Age: ${sub.childAge})` : ''}`
      : sub.childDetails || 'N/A',
    'Appointment / Slot': sub.date ? `${sub.date} (${sub.preferredSlot || ''})` : 'N/A',
    'Message / Grievance': sub.message || sub.childDetails || sub.notes || 'N/A',
    'Status': (sub.status || 'new').toUpperCase(),
    'Staff Notes': sub.notes || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths for readability
  worksheet['!cols'] = [
    { wch: 5 },  // #
    { wch: 20 }, // ID
    { wch: 22 }, // Date
    { wch: 14 }, // Type
    { wch: 22 }, // Parent Name
    { wch: 16 }, // Phone
    { wch: 25 }, // Email
    { wch: 22 }, // Program
    { wch: 24 }, // Child
    { wch: 22 }, // Appointment
    { wch: 35 }, // Message
    { wch: 12 }, // Status
    { wch: 25 }, // Staff Notes
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

  const fileName = `little-noor-submissions-${filterLabel.toLowerCase()}-${getFormattedDateStamp()}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

export function exportToPdf(submissions: SubmissionRecord[], filterLabel = 'All') {
  if (!submissions || submissions.length === 0) {
    alert('No submissions available to export.');
    return;
  }

  // Landscape A4 for wide table presentation
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Top Title & Branding
  doc.setFillColor(30, 58, 43); // Deep Forest Green (#1E3A2B)
  doc.rect(0, 0, pageWidth, 55, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(250, 248, 241); // Warm Cream (#FAF8F1)
  doc.text('LITTLE NOOR MONTESSORI SCHOOL, BHUJ', 30, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(200, 169, 107); // Champagne Gold (#C8A96B)
  doc.text('Official Form Submissions Database Backup & Inquiries Report', 30, 42);

  // Metadata Subheader
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
  doc.text(`Generated: ${dateStr}  |  Filter: ${filterLabel}  |  Total Submissions: ${submissions.length}`, 30, 75);

  const tableBody = submissions.map((sub, idx) => {
    const childStr = sub.childName
      ? `${sub.childName}${sub.childAge ? ` (${sub.childAge})` : ''}`
      : 'N/A';

    const programStr = sub.program || (sub.type === 'enrollment' ? sub.preferredSlot : '—');
    const msgStr = (sub.message || sub.childDetails || '—').replace(/\s+/g, ' ').substring(0, 90);

    return [
      idx + 1,
      sub.submittedAt ? sub.submittedAt.split(',')[0] : '—',
      (sub.type || 'enquiry').toUpperCase(),
      sub.parentName || '—',
      sub.phone || '—',
      sub.email || '—',
      programStr,
      childStr,
      msgStr,
      (sub.status || 'new').toUpperCase(),
    ];
  });

  autoTable(doc, {
    startY: 88,
    head: [[
      '#',
      'Date',
      'Type',
      'Parent Name',
      'Phone',
      'Email',
      'Program',
      'Child',
      'Message / Details',
      'Status',
    ]],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 58, 43], // Deep Forest Green
      textColor: [250, 248, 241],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 4,
      textColor: [30, 30, 30],
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 20, halign: 'center' },
      1: { cellWidth: 55 },
      2: { cellWidth: 58 },
      3: { cellWidth: 80 },
      4: { cellWidth: 70 },
      5: { cellWidth: 85 },
      6: { cellWidth: 75 },
      7: { cellWidth: 65 },
      8: { cellWidth: 175 },
      9: { cellWidth: 55, halign: 'center' },
    },
    alternateRowStyles: {
      fillColor: [248, 247, 242],
    },
    margin: { left: 25, right: 25 },
  });

  const fileName = `little-noor-report-${filterLabel.toLowerCase()}-${getFormattedDateStamp()}.pdf`;
  doc.save(fileName);
}
