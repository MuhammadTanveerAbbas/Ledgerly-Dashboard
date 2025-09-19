"use client";

import {
  Coffee,
  ShoppingCart,
  Film,
  HeartPulse,
  BookOpen,
  Car,
  Home,
  Receipt,
  Gift,
  Briefcase,
  TrendingUp,
  Landmark,
  Plane,
  Sparkles,
  Dog,
  Dumbbell,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Coffee,
  ShoppingCart,
  Film,
  HeartPulse,
  BookOpen,
  Car,
  Home,
  Receipt,
  Gift,
  Briefcase,
  TrendingUp,
  Landmark,
  Plane,
  Sparkles,
  Dog,
  Dumbbell,
};

interface CategoryIconProps extends LucideProps {
  name: string;
}

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  const Icon = icons[name];
  if (!Icon) {
    return <Landmark {...props} />; // Return a default icon
  }
  return <Icon {...props} />;
}
