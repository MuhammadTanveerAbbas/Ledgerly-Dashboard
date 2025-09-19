import type { Transaction, Category } from '@/lib/types';

export const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Food & Drink', icon: 'Coffee', color: 'hsl(var(--chart-1))' },
  { id: 'cat-2', name: 'Shopping', icon: 'ShoppingCart', color: 'hsl(var(--chart-2))' },
  { id: 'cat-3', name: 'Entertainment', icon: 'Film', color: 'hsl(var(--chart-3))' },
  { id: 'cat-4', name: 'Health', icon: 'HeartPulse', color: 'hsl(var(--chart-4))' },
  { id: 'cat-5', name: 'Education', icon: 'BookOpen', color: 'hsl(var(--chart-5))' },
  { id: 'cat-6', name: 'Transport', icon: 'Car', color: 'hsl(var(--chart-1))' },
  { id: 'cat-7', name: 'Housing', icon: 'Home', color: 'hsl(var(--chart-2))' },
  { id: 'cat-8', name: 'Bills', icon: 'Receipt', color: 'hsl(var(--chart-3))' },
  { id: 'cat-9', name: 'Gifts', icon: 'Gift', color: 'hsl(var(--chart-4))' },
  { id: 'cat-10', name: 'Work', icon: 'Briefcase', color: 'hsl(var(--chart-5))' },
  { id: 'cat-11', name: 'Salary', icon: 'TrendingUp', color: 'hsl(var(--chart-1))' },
  { id: 'cat-12', name: 'Travel', icon: 'Plane', color: 'hsl(var(--chart-2))' },
  { id: 'cat-13', name: 'Personal Care', icon: 'Sparkles', color: 'hsl(var(--chart-3))' },
  { id: 'cat-14', name: 'Pets', icon: 'Dog', color: 'hsl(var(--chart-4))' },
  { id: 'cat-15', name: 'Fitness', icon: 'Dumbbell', color: 'hsl(var(--chart-5))' },
  { id: 'cat-16', name: 'Other', icon: 'Landmark', color: 'hsl(var(--chart-2))' },
];

export const initialTransactions: Transaction[] = [];
