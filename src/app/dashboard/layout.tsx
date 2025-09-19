import { PageHeader } from '@/components/layout/page-header';
import { DashboardProvider } from '@/hooks/use-dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen flex-col">
        <PageHeader />
        <main className="flex-1">{children}</main>
      </div>
    </DashboardProvider>
  );
}
