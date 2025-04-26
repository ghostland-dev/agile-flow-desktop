
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CustomReports() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Custom Reports</h1>
          <p className="text-muted-foreground">
            Build and save custom reports for your needs
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Builder</CardTitle>
            <CardDescription>Create custom reports with flexible parameters</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Custom report builder will be implemented here</p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
