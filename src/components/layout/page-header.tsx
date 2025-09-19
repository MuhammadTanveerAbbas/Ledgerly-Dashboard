
"use client";

import React from 'react';
import {
  Download,
  FileJson,
  FileText,
  Upload,
  FileUp,
  FileDown,
  Github,
  HelpCircle,
  PlusCircle,
  Menu,
  CircleDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useDashboard } from '@/hooks/use-dashboard';
import { generatePdf } from '@/lib/pdf';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '../ui/separator';

export function PageHeader() {
  const {
    transactions,
    categories,
    importTransactionsJson,
    importTransactionsCsv,
    setNewTransaction,
  } = useDashboard();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleExportJson = () => {
    if (transactions.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'There are no transactions to export.',
      });
      return;
    }
    const dataStr = JSON.stringify({ transactions, categories }, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'ledgerly_backup.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast({
      title: 'Export Successful',
      description: 'Your data has been exported to JSON.',
    });
  };

  const handleExportCsv = () => {
    if (transactions.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'There are no transactions to export.',
      });
      return;
    }
    const header = Object.keys(transactions[0]).join(',');
    const rows = transactions.map((row) => Object.values(row).join(','));
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: 'Export Successful',
      description: 'Transactions have been exported to CSV.',
    });
  };

  const handleFileImport = (importer: (file: File) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        if (file.name.endsWith('.json')) {
          importTransactionsJson(file);
        } else if (file.name.endsWith('.csv')) {
          importTransactionsCsv(file);
        } else {
          toast({
            variant: 'destructive',
            title: 'Unsupported File Type',
            description: 'Please select a JSON or CSV file.',
          });
        }
      }
    };
    input.click();
  };

  const DesktopMenu = () => (
    <div className="hidden items-center justify-end gap-2 md:flex">
      <Button size="sm" onClick={() => setNewTransaction()}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Import / Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Data Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleFileImport(importTransactionsCsv)}>
            <FileUp className="mr-2 h-4 w-4" />
            Import from CSV
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleExportCsv}>
            <FileDown className="mr-2 h-4 w-4" />
            Export to CSV
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleFileImport(importTransactionsJson)}>
            <Upload className="mr-2 h-4 w-4" />
            Import from JSON
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleExportJson}>
            <FileJson className="mr-2 h-4 w-4" />
            Export to JSON (Backup)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            PDF Report
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>PDF Reports</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => generatePdf(transactions)}>
            Summary Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Ledgerly is a local first finance tracker. All your data is saved
              in your browser. You can import/export your data anytime.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Link
        href="https://github.com/muhammadtanveerabbas/Ledgerly"
        target="_blank"
        prefetch={false}
      >
        <Button variant="outline" size="icon">
          <Github className="h-4 w-4 text-muted-foreground" />
        </Button>
      </Link>
    </div>
  );

  const MobileMenu = () => (
    <div className="flex items-center gap-2 md:hidden">
        <Button size="sm" onClick={() => setNewTransaction()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
        </Button>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                 <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)} prefetch={false}>
                      <CircleDollarSign className="h-6 w-6" />
                      <span className="font-bold">Ledgerly</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                    <Button variant="outline" className="justify-start" onClick={() => { handleFileImport(importTransactionsCsv); setIsMobileMenuOpen(false); }}>
                        <FileUp className="mr-2 h-4 w-4" /> Import from CSV
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => { handleExportCsv(); setIsMobileMenuOpen(false); }}>
                        <FileDown className="mr-2 h-4 w-4" /> Export to CSV
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => { handleFileImport(importTransactionsJson); setIsMobileMenuOpen(false); }}>
                        <Upload className="mr-2 h-4 w-4" /> Import from JSON
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => { handleExportJson(); setIsMobileMenuOpen(false); }}>
                        <FileJson className="mr-2 h-4 w-4" /> Export to JSON
                    </Button>
                    <Separator />
                     <Button variant="outline" className="justify-start" onClick={() => { generatePdf(transactions); setIsMobileMenuOpen(false); }}>
                        <FileText className="mr-2 h-4 w-4" /> Generate PDF Report
                    </Button>
                     <Separator />
                      <Link
                        href="https://github.com/muhammadtanveerabbas/Ledgerly"
                        target="_blank"
                        onClick={() => setIsMobileMenuOpen(false)}
                        prefetch={false}
                      >
                        <Button variant="outline" className="w-full justify-start">
                          <Github className="mr-2 h-4 w-4" />
                          muhammadtanveerabbas
                        </Button>
                      </Link>
                </div>
            </SheetContent>
        </Sheet>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex flex-1 items-center gap-2">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <CircleDollarSign className="h-6 w-6" />
          <span className="font-bold">Ledgerly</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end">
        <DesktopMenu />
        <MobileMenu />
      </div>
    </header>
  );
}
