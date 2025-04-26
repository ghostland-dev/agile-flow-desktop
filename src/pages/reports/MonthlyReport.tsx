
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MonthlyReport() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Monthly Report</h1>
          <p className="text-muted-foreground">
            April 2025 performance summary
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Performance metrics for the current month</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Monthly report content will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
