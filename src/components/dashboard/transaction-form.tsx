"use client"

import React from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDashboard } from "@/hooks/use-dashboard"
import type { Transaction } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  type: z.enum(["income", "expense", "saving", "investment"]),
  category: z.string().min(1, { message: "Please select a category." }),
  currency: z.string().default("USD"),
  date: z.date({
    required_error: "A date is required.",
  }).max(new Date(), { message: "Date cannot be in the future." }),
});

interface TransactionFormProps {
    transaction: Transaction | null;
    isOpen: boolean;
    onClose: () => void;
}

export function TransactionForm({ transaction, isOpen, onClose }: TransactionFormProps) {
  const { categories, addTransaction, updateTransaction } = useDashboard();
  const isNewTransaction = !transaction?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction?.description ?? "",
      amount: transaction?.amount ?? 0,
      type: transaction?.type ?? "expense",
      category: transaction?.category ?? "",
      currency: transaction?.currency ?? "USD",
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  })

  // Reset form when transaction changes
  React.useEffect(() => {
    form.reset({
      description: transaction?.description ?? "",
      amount: transaction?.amount ?? 0,
      type: transaction?.type ?? "expense",
      category: transaction?.category ?? categories[0]?.name,
      currency: transaction?.currency ?? "USD",
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    });
  }, [transaction, form, categories]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isNewTransaction) {
        addTransaction({...values, date: values.date.toISOString()});
    } else if(transaction) {
        updateTransaction({ ...transaction, ...values, date: values.date.toISOString()});
    }
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{isNewTransaction ? 'Add Transaction' : 'Edit Transaction'}</DialogTitle>
                <DialogDescription>
                    {isNewTransaction ? "Add a new transaction to your ledger." : "Make changes to your existing transaction."}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Coffee with friends" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Transaction Type</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-2"
                            >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="income" />
                                </FormControl>
                                <FormLabel className="font-normal">Income</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="expense" />
                                </FormControl>
                                <FormLabel className="font-normal">Expense</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="saving" />
                                </FormControl>
                                <FormLabel className="font-normal">Saving</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="investment" />
                                </FormControl>
                                <FormLabel className="font-normal">Investment</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {categories.map(c => (
                                <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">{isNewTransaction ? 'Add' : 'Save Changes'}</Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}
