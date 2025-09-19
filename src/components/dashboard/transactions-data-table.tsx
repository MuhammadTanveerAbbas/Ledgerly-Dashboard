"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { useDashboard } from "@/hooks/use-dashboard"
import { RefreshCw, PlusCircle, Tag, ListFilter } from "lucide-react"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const EmptyState = () => {
    const { setNewTransaction } = useDashboard();
    return (
        <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Welcome to Ledgerly</h3>
            <p className="text-muted-foreground mb-4">You haven't added any transactions yet. Get started by adding your first one.</p>
            <Button onClick={() => setNewTransaction()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Transaction
            </Button>
        </div>
    )
};


export function TransactionsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { categories } = useDashboard();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);

    React.useEffect(() => {
        // Set initial saved time
        if(data.length > 0) {
            setLastSaved(new Date());
        }

        const intervalId = setInterval(() => {
            if(document.visibilityState === 'visible') {
              setLastSaved(new Date());
            }
        }, 30000); // Update every 30 seconds

        return () => clearInterval(intervalId);
    }, [data.length]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const categoryOptions = React.useMemo(() => {
    return categories.map(c => ({ label: c.name, value: c.name }))
  }, [categories]);

  const typeOptions = React.useMemo(() => [
    { label: "Income", value: "income"},
    { label: "Expense", value: "expense"},
    { label: "Saving", value: "saving"},
    { label: "Investment", value: "investment"},
  ], []);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>A list of your recent income and expenses.</CardDescription>
            </div>
             <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground sm:mt-0 sm:text-sm">
                {lastSaved ? (
                    <>
                        <RefreshCw className="h-3 w-3" />
                        <span>Saved locally: {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>
                    </>
                ) : (
                   data.length > 0 && <span>Syncing...</span>
                )}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-between gap-2 py-4">
          <div className="flex flex-wrap flex-1 items-center gap-2">
            <Input
              placeholder="Filter by description..."
              value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("description")?.setFilterValue(event.target.value)
              }
              className="h-8 w-full sm:w-[150px] lg:w-[250px]"
            />
            {table.getColumn("category") && (
              <DataTableFacetedFilter
                column={table.getColumn("category")}
                title="Category"
                options={categoryOptions}
                icon={Tag}
              />
            )}
             {table.getColumn("type") && (
              <DataTableFacetedFilter
                column={table.getColumn("type")}
                title="Type"
                options={typeOptions}
                icon={ListFilter}
              />
            )}
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="p-2 sm:p-4">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-2 sm:p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24">
                     {data.length === 0 ? <EmptyState /> : <div className="text-center">No results.</div>}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-center space-x-4 py-4">
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            Previous
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            Next
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
