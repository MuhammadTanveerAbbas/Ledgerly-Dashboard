"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MinusCircle, PlusCircle, MoreHorizontal, Pencil, Trash2, PiggyBank, CandlestickChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboard } from "@/hooks/use-dashboard"


const ActionCell = ({ row }: { row: any }) => {
  const { setDeletionTarget, setEditingTransaction } = useDashboard();
  const transaction = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.id)}>
          Copy Transaction ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setEditingTransaction(transaction)}>
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDeletionTarget(transaction)} className="text-red-500">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "",
    cell: ({ row }) => {
        const type = row.getValue("type") as string;
        if (type === 'income') {
            return <PlusCircle className="h-4 w-4 text-green-500" />
        }
        if (type === 'expense') {
            return <MinusCircle className="h-4 w-4 text-red-500" />
        }
        if (type === 'saving') {
            return <PiggyBank className="h-4 w-4 text-blue-500" />
        }
        if (type === 'investment') {
            return <CandlestickChart className="h-4 w-4 text-purple-500" />
        }
        return <MinusCircle className="h-4 w-4 text-red-500" />
    },
    size: 20,
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
        return <Badge variant="outline">{row.getValue("category")}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const date = new Date(row.getValue("date") as string);
        return <div>{format(date, 'yyyy-MM-dd')}</div>
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const currency = row.original.currency
      const type = row.original.type
      const formatted = formatCurrency(amount, currency)
 
      return <div className={`text-right font-medium ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}>{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ActionCell,
  },
]
