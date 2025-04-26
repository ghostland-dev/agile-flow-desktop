
import React, { Suspense } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { AppHeader } from "./AppHeader";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <Suspense fallback={<div className="p-6"><LoadingSkeleton /></div>}>
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </Suspense>
      </div>
    </div>
  );
}
