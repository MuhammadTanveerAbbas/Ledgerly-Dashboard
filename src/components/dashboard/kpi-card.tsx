import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  isRate?: boolean;
}

export function KpiCard({ title, value, change, changeType, icon: Icon, isRate = false }: KpiCardProps) {
  const changeText = isRate ? `${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  const isPositive = changeType === 'increase';

  // For expenses, a decrease is good (increase in performance)
  // and an increase is bad (decrease in performance)
  const isExpenseMetric = title === "Expenses";
  const effectiveChangeType = isExpenseMetric ? (change > 0 ? 'decrease' : 'increase') : changeType;
  const isEffectivePositive = effectiveChangeType === 'increase';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span
            className={cn(
              "flex items-center gap-1",
              isEffectivePositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isEffectivePositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {changeText}
          </span>
          <span>from last 30 days</span>
        </div>
      </CardContent>
    </Card>
  );
}
