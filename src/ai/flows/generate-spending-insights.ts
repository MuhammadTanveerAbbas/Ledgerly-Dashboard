'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating spending insights from transaction data.
 *
 * The flow takes transaction data as input and returns a textual summary of spending habits, highlighting trends and anomalies.
 * - generateSpendingInsights - A function that handles the spending insights generation process.
 * - GenerateSpendingInsightsInput - The input type for the generateSpendingInsights function.
 * - GenerateSpendingInsightsOutput - The return type for the generateSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSpendingInsightsInputSchema = z.object({
  transactions: z.array(
    z.object({
      date: z.string().describe('The date of the transaction.'),
      description: z.string().describe('A description of the transaction.'),
      amount: z.number().describe('The amount of the transaction.'),
      category: z.string().describe('The category of the transaction.'),
    })
  ).describe('An array of transaction objects.'),
});
export type GenerateSpendingInsightsInput = z.infer<typeof GenerateSpendingInsightsInputSchema>;

const GenerateSpendingInsightsOutputSchema = z.object({
  summary: z.string().describe("A concise one or two sentence overview of the user's spending habits."),
  observations: z.array(z.string()).describe('A list of 2 to 3 key observations or trends, formatted as bullet points.'),
  suggestions: z.array(z.string()).describe('A list of 2 to 3 actionable suggestions for financial improvement, formatted as bullet points.'),
});
export type GenerateSpendingInsightsOutput = z.infer<typeof GenerateSpendingInsightsOutputSchema>;

export async function generateSpendingInsights(input: GenerateSpendingInsightsInput): Promise<GenerateSpendingInsightsOutput> {
  return generateSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSpendingInsightsPrompt',
  input: {schema: GenerateSpendingInsightsInputSchema},
  output: {schema: GenerateSpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following transaction data and provide a summary of spending habits, highlighting any trends or anomalies.

Transaction Data:
{{#each transactions}}
Date: {{date}}, Description: {{description}}, Amount: {{amount}}, Category: {{category}}
{{/each}}

Provide your analysis in a structured format. Do not use hyphens in your response. Your entire response must be in the JSON format described below.

1.  **summary**: A concise one or two sentence overview of the user's spending habits.
2.  **observations**: A list of 2 to 3 key observations or trends.
3.  **suggestions**: A list of 2 to 3 actionable suggestions for financial improvement.
`,
});

const generateSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'generateSpendingInsightsFlow',
    inputSchema: GenerateSpendingInsightsInputSchema,
    outputSchema: GenerateSpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
