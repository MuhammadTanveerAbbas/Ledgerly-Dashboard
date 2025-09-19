import type { LucideIcon } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'saving' | 'investment';
  category: string;
  currency: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
}

export interface DataTableFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}
