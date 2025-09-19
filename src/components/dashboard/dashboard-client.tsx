
"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from 'next/dynamic';
import { KpiCard } from "./kpi-card";
import { TransactionsDataTable } from "./transactions-data-table";
import { columns } from "./columns";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, Wallet, Loader2 } from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { TransactionForm } from "./transaction-form";
import { subDays } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "../ui/skeleton";
import type { Transaction } from "@/lib/types";

const Charts = dynamic(() => import('./charts').then(mod => mod.Charts), { 
  ssr: false,
  loading: () => <Skeleton className="h-[480px]" />
});
const AiInsights = dynamic(() => import('./ai-insights').then(mod => mod.AiInsights), { 
  ssr: false,
  loading: () => <Skeleton className="h-[480px]" />
});


function calculateMetrics(transactions: Transaction[]) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense' || t.type === 'saving' || t.type === 'investment')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  return { income, expenses, balance, savingsRate };
}

function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
}


export function DashboardClient() {
  const { 
    transactions, 
    editingTransaction, 
    setEditingTransaction,
    deletionTarget,
    setDeletionTarget,
    deleteTransaction
  } = useDashboard();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const {
    currentMetrics,
    previousMetrics
  } = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);

    const currentTransactions = transactions.filter(t => new Date(t.date) >= thirtyDaysAgo);
    const previousTransactions = transactions.filter(t => new Date(t.date) >= sixtyDaysAgo && new Date(t.date) < thirtyDaysAgo);

    return {
      currentMetrics: calculateMetrics(currentTransactions),
      previousMetrics: calculateMetrics(previousTransactions)
    }
  }, [transactions]);


  const netBalanceChange = calculatePercentageChange(currentMetrics.balance, previousMetrics.balance);
  const incomeChange = calculatePercentageChange(currentMetrics.income, previousMetrics.income);
  const expensesChange = calculatePercentageChange(currentMetrics.expenses, previousMetrics.expenses);
  const savingsRateChange = currentMetrics.savingsRate - previousMetrics.savingsRate;

  const handleDelete = () => {
    if (deletionTarget) {
      deleteTransaction(deletionTarget.id);
      setDeletionTarget(null);
    }
  }

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Net Balance"
            value={formatCurrency(currentMetrics.balance)}
            change={netBalanceChange}
            changeType={netBalanceChange >= 0 ? 'increase' : 'decrease'}
            icon={Wallet}
          />
          <KpiCard
            title="Income"
            value={formatCurrency(currentMetrics.income)}
            change={incomeChange}
            changeType={incomeChange >= 0 ? 'increase' : 'decrease'}
            icon={TrendingUp}
          />
          <KpiCard
            title="Expenses"
            value={formatCurrency(currentMetrics.expenses)}
            change={expensesChange}
            changeType={expensesChange > 0 ? 'decrease' : 'increase'} // Lower expenses is an "increase" in performance
            icon={TrendingDown}
          />
          <KpiCard
            title="Savings Rate"
            value={`${currentMetrics.savingsRate.toFixed(1)}%`}
            change={savingsRateChange}
            changeType={savingsRateChange >= 0 ? 'increase' : 'decrease'}
            isRate={true}
            icon={DollarSign}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Charts transactions={transactions} />
          </div>
          <div className="lg:col-span-2">
            <AiInsights transactions={transactions} />
          </div>
        </div>
        <div>
           <TransactionsDataTable columns={columns} data={transactions} />
        </div>
      </div>
      <TransactionForm 
        transaction={editingTransaction}
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
      />
      <AlertDialog open={!!deletionTarget} onOpenChange={() => setDeletionTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletionTarget(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
