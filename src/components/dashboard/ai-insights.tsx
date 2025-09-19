"use client";

import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Loader2 } from "lucide-react";
import { generateSpendingInsights, type GenerateSpendingInsightsOutput } from "@/ai/flows/generate-spending-insights";
import type { Transaction } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface AiInsightsProps {
  transactions: Transaction[];
}

export function AiInsights({ transactions }: AiInsightsProps) {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState<GenerateSpendingInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = () => {
    startTransition(async () => {
      setError(null);
      setInsights(null);
      if (transactions.length === 0) {
        setError("There are no transactions to analyze. Please add some transactions first.");
        return;
      }
      try {
        const result = await generateSpendingInsights({ transactions });
        setInsights(result);
      } catch (e) {
        console.error(e);
        setError("Failed to generate insights. Please try again.");
      }
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-muted-foreground" />
          AI Spending Insights
        </CardTitle>
        <CardDescription>
          Let AI analyze your spending habits and provide a summary.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
         <ScrollArea className="h-full pr-4">
            {isPending && (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Analyzing your transactions...</p>
                </div>
            </div>
            )}
            {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {insights && (
                <div className="space-y-4 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2">Overall Summary</h4>
                        <p className="text-muted-foreground">{insights.summary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Key Observations</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {insights.observations.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Actionable Suggestions</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {insights.suggestions.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            )}
            {!isPending && !insights && !error && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                    <p>Click the button below to generate insights about your spending.</p>
                </div>
            )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateInsights}
          disabled={isPending || transactions.length === 0}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Generate Insights
        </Button>
      </CardFooter>
    </Card>
  );
}
