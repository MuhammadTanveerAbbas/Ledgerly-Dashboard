import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Transaction } from './types';
import { formatCurrency } from './utils';
import { format } from 'date-fns';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export const generatePdf = (transactions: Transaction[]) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  // Header
  doc.setFontSize(20);
  doc.text('Financial Report', 14, 22);
  doc.setFontSize(12);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  // Summary
  doc.setFontSize(16);
  doc.text('Summary', 14, 45);
  doc.setFontSize(12);
  doc.text(`Total Income: ${formatCurrency(totalIncome)}`, 14, 55);
  doc.text(`Total Expenses: ${formatCurrency(totalExpenses)}`, 14, 62);
  doc.text(`Net Balance: ${formatCurrency(netBalance)}`, 14, 69);
  
  // Table
  const tableColumn = ["Date", "Description", "Category", "Type", "Amount"];
  const tableRows: (string | number)[][] = [];

  transactions.forEach(transaction => {
    const transactionData = [
      format(new Date(transaction.date), 'yyyy MM dd'),
      transaction.description,
      transaction.category,
      transaction.type,
      formatCurrency(transaction.amount, transaction.currency)
    ];
    tableRows.push(transactionData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 80,
  });
  
  doc.save('financial_report.pdf');
};
