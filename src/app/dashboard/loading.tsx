import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm">
      <Loader2 className="h-12 w-12 animate-spin" />
      <p className="mt-4 text-lg">Loading your dashboard...</p>
    </div>
  );
}
