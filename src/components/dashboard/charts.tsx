"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Legend,
  TooltipProps,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Transaction } from "@/lib/types";
import { useMemo, useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
];

const CustomTooltip = ({ active, payload, label, isMobile }: TooltipProps<ValueType, NameType> & { isMobile?: boolean }) => {
  if (active && payload && payload.length) {
    const dateLabel = isMobile 
      ? new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : new Date(label).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Balance
            </span>
            <span className="font-bold text-muted-foreground">
              {formatCurrency(payload[0].value as number)}
            </span>
          </div>
           <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold">
              {dateLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};


export function Charts({ transactions }: ChartsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const spendingByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>();
    transactions.forEach(t => {
      if (t.type === 'expense' || t.type === 'saving' || t.type === 'investment') {
        const currentAmount = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, currentAmount + t.amount);
      }
    });
    return Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);
  
  const balanceOverTime = useMemo(() => {
    const sorted = [...transactions].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let runningBalance = 0;
    const data = sorted.map(t => {
      runningBalance += t.type === 'income' ? t.amount : -t.amount;
      return {
        date: t.date,
        balance: runningBalance
      };
    });
    return data;
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Visualize your income and spending habits.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="balance">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="balance">Balance Over Time</TabsTrigger>
            <TabsTrigger value="spending">Spending by Category</TabsTrigger>
          </TabsList>
          <TabsContent value="balance">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceOverTime}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(str) => {
                      const date = new Date(str);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    content={<CustomTooltip isMobile={isMobile} />}
                  />
                  <Area type="monotone" dataKey="balance" stroke="hsl(var(--chart-1))" fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="spending">
            <div className="h-[350px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                        data={spendingByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={isMobile ? 80 : 120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {spendingByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))'}} formatter={(value: number) => formatCurrency(value)}/>
                    <Legend layout={isMobile ? 'horizontal' : 'vertical'} align={isMobile ? 'center' : 'right'} verticalAlign={isMobile ? 'bottom' : 'middle'} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
