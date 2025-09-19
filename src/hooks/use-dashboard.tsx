"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Transaction, Category } from '@/lib/types';
import { initialCategories, initialTransactions } from '@/lib/data';
import Papa from 'papaparse';
import { toast } from './use-toast';

interface DashboardContextType {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'currency'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  importTransactionsJson: (file: File) => void;
  importTransactionsCsv: (file: File) => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
  setNewTransaction: () => void;
  deletionTarget: Transaction | null;
  setDeletionTarget: (transaction: Transaction | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(error);
        setStoredValue(initialValue);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error)
        }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};


export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', initialCategories);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletionTarget, setDeletionTarget] = useState<Transaction | null>(null);


  const addTransaction = (transaction: Omit<Transaction, 'id' | 'currency'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn${Date.now()}`,
      currency: 'USD',
    };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({ title: "Transaction Added", description: "The new transaction has been successfully added." });
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    toast({ title: "Transaction Updated", description: "The transaction has been successfully updated." });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({ title: "Transaction Deleted", description: "The transaction has been successfully deleted." });
  };

  const importTransactionsJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.transactions && Array.isArray(data.transactions)) {
          // Basic validation for a few transactions
          const isValid = data.transactions.slice(0, 5).every((t: any) => 
            'id' in t && 'date' in t && 'description' in t && 'amount' in t && 'type' in t
          );
          if (isValid) {
            setTransactions(data.transactions);
            if (data.categories && Array.isArray(data.categories)) {
              setCategories(data.categories);
            }
            toast({ title: "Import Successful", description: "Your data has been imported from JSON." });
          } else {
             toast({ variant: "destructive", title: "Invalid JSON format", description: "The JSON file does not have the expected structure." });
          }
        } else {
           toast({ variant: "destructive", title: "Invalid JSON format", description: "The JSON file must contain a 'transactions' array." });
        }
      } catch (error) {
        toast({ variant: "destructive", title: "Import Failed", description: "Could not parse the JSON file." });
      }
    };
    reader.readAsText(file);
  };
  
  const importTransactionsCsv = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
            const importedTransactions: Transaction[] = results.data.map((row: any) => ({
              id: row.id || `txn${Date.now()}${Math.random()}`,
              date: row.date ? new Date(row.date).toISOString() : new Date().toISOString(),
              description: row.description || 'No Description',
              amount: parseFloat(row.amount) || 0,
              type: ['income', 'expense', 'saving', 'investment'].includes(row.type) ? row.type : 'expense',
              category: row.category || 'Other',
              currency: row.currency || 'USD',
            }));

            // Basic validation
            if (importedTransactions.length > 0 && 'description' in importedTransactions[0]) {
                 setTransactions(prev => [...prev, ...importedTransactions]);
                 toast({ title: "Import Successful", description: "Your data has been imported from CSV." });
            } else {
                throw new Error("CSV file does not contain valid transaction data.");
            }

        } catch (error) {
            console.error("CSV Import Error:", error);
            toast({ variant: "destructive", title: "Import Failed", description: "Could not parse the CSV file. Check the file format and content." });
        }
      },
      error: (error) => {
        console.error("PapaParse Error:", error);
        toast({ variant: "destructive", title: "Import Failed", description: "An error occurred while parsing the CSV file." });
      }
    });
  };

  const setNewTransaction = () => {
    setEditingTransaction({
      id: '', // Empty id signifies a new transaction
      date: new Date().toISOString(),
      description: '',
      amount: 0,
      type: 'expense',
      category: categories[0]?.name || 'Other',
      currency: 'USD',
    });
  };


  return (
    <DashboardContext.Provider value={{ 
        transactions, 
        categories, 
        addTransaction, 
        updateTransaction, 
        deleteTransaction,
        importTransactionsJson,
        importTransactionsCsv,
        editingTransaction,
        setEditingTransaction,
        setNewTransaction,
        deletionTarget,
        setDeletionTarget,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
