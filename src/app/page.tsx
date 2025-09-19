
"use client";

import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  Rocket,
  Github,
  Linkedin,
  PieChart,
  ShieldCheck,
  TrendingUp,
  User,
  Loader2,
  FileDown,
  FileText,
  Smartphone,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleGetStartedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push('/dashboard');
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      )}
      <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
            <Link
              href="#"
              className="flex items-center gap-2"
              prefetch={false}
            >
              <CircleDollarSign className="h-6 w-6" />
              <span className="font-bold">Ledgerly</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="https://github.com/MuhammadTanveerAbbas" target="_blank" prefetch={false}>
                  <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                  </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section
            id="hero"
            className="container flex flex-col items-center justify-center space-y-4 py-20 text-center md:py-28"
          >
            <Link href="#features" prefetch={false}>
              <Badge variant="outline" className="mb-2 cursor-pointer px-3 py-1 text-sm">
                AI Spending Insights <span className="ml-2 text-muted-foreground">✨</span>
              </Badge>
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Your Financial Freedom
            </h1>
            <p className="max-w-[700px] text-sm text-muted-foreground md:text-lg">
              Ledgerly is a modern personal finance dashboard that helps you track
              your spending, manage your budget, and achieve your financial
              goals.
            </p>
            <Link href="/dashboard" onClick={handleGetStartedClick} prefetch={false}>
              <Button>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="mx-auto mt-12 w-full max-w-3xl rounded-lg bg-accent p-6 sm:mx-4">
              <div className="grid grid-cols-3 gap-y-8 gap-x-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold">Secure</h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <BarChart className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold">Insights</h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold">Free</h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Smartphone className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold">Responsive</h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FileDown className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold">Export</h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold">Reports</h3>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="w-full bg-background py-12 md:py-24">
            <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your money in one place.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center justify-between pb-2">
                    <CreditCard className="mb-2 h-6 w-6 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">
                      Expense Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Easily add, edit, and delete transactions.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center justify-between pb-2">
                    <PieChart className="mb-2 h-6 w-6 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">
                      Budgeting Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Visualize spending by category.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center justify-between pb-2">
                    <TrendingUp className="mb-2 h-6 w-6 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">
                      Financial Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Get AI powered insights into your spending habits.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="w-full bg-accent py-12 md:py-24">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How It Works
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting started with Ledgerly is simple.
                </p>
              </div>
              <div className="grid max-w-4xl grid-cols-1 gap-8 py-12 sm:grid-cols-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-lg font-bold">Import Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Add transactions manually or upload them via CSV.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-lg font-bold">Analyze</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize your spending and get AI powered insights.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-lg font-bold">Take Action</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the insights to improve your financial health.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="testimonials"
            className="w-full bg-background py-12 md:py-24"
          >
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Users Say
                </h2>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="text-left">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <User className="text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Alex J.</p>
                        <p className="text-xs text-muted-foreground">
                          Happy User
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "Ledgerly has transformed how I manage my money. The AI
                      insights are a game changer!"
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-left">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <User className="text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Sarah P.</p>
                        <p className="text-xs text-muted-foreground">
                          Power User
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "Finally, a finance app that is both powerful and easy to
                      use. Highly recommended."
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-left">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <User className="text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Michael K.</p>
                        <p className="text-xs text-muted-foreground">
                          Frugal Fan
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "I love the clean interface and the detailed reports. It's
                      helped me save more than ever."
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden sm:block text-left">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <User className="text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Emily R.</p>
                        <p className="text-xs text-muted-foreground">
                          Budget Beginner
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "As someone new to budgeting, Ledgerly has been incredibly helpful. It's so intuitive!"
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden lg:block text-left">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <User className="text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">David L.</p>
                        <p className="text-xs text-muted-foreground">
                          Freelancer
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "This is the perfect tool for tracking my business and personal expenses separately. A must have!"
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden lg:block text-left">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <User className="text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Jessica M.</p>
                        <p className="text-xs text-muted-foreground">
                          Student
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "Ledgerly helps me keep an eye on my spending so I don't blow my student loan. Love it!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="faq" className="w-full bg-accent py-12 md:py-24">
            <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center px-4 md:px-6">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full pt-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left no-underline hover:no-underline">
                    Is my data secure?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    Yes, your data is stored securely in your browser's local storage. It never leaves your device and we do not collect it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left no-underline hover:no-underline">
                    Do I need an account?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    No, Ledgerly works entirely offline. There's no need to sign up or log in. Just open the app and start tracking.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left no-underline hover:no-underline">
                    Is there a mobile app?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    Currently, we have a web based application that is fully responsive and works on all devices. A native mobile app is on our roadmap.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left no-underline hover:no-underline">
                    Can I export my data?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    Yes, you can export your transaction data to CSV or JSON formats at any time from the dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left no-underline hover:no-underline">
                    How do I get support?
                  </AccordionTrigger>
                  <AccordionContent className="text-left">
                    You can contact our support team through the contact form on our website or by emailing support@ledgerly.com.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>
        <footer className="border-t">
          <div className="container flex h-14 items-center justify-between px-4 text-xs text-muted-foreground sm:px-6">
            <p className='flex items-center gap-2'>
              <User className='h-4 w-4' />
              Made by Muhammad Tanveer Abbas
            </p>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="https://www.linkedin.com/in/muhammadtanveerabbas"
                className="hover:text-primary"
                prefetch={false}
                target="_blank"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://github.com/muhammadtanveerabbas"
                className="hover:text-primary"
                prefetch={false}
                target="_blank"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://x.com/m_tanveer"
                className="hover:text-primary"
                prefetch={false}
                target="_blank"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="currentColor"
                  viewBox="0 0 1200 1227"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6902H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
