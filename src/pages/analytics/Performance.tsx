
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';

export default function Performance() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Données fictives pour les graphiques
  const performanceData = {
    daily: [65, 59, 80, 81, 56, 55, 40],
    weekly: [28, 48, 40, 19, 86, 27, 90],
    monthly: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
  };

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your project's performance metrics and insights
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Task Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +5.1% from previous period
                  </p>
                  <div className="h-[80px] mt-4 bg-muted/20 rounded-md">
                    {/* Placeholder for chart */}
                    <div className="h-full flex items-end p-2">
                      {performanceData.daily.map((value, index) => (
                        <div 
                          key={index} 
                          className="flex-1 mx-0.5 bg-primary/70 rounded-t-sm" 
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Time to Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.4 days</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    -0.8 days from previous period
                  </p>
                  <div className="h-[80px] mt-4 bg-muted/20 rounded-md">
                    {/* Placeholder for chart */}
                    <div className="h-full flex items-end p-2">
                      {performanceData.weekly.map((value, index) => (
                        <div 
                          key={index} 
                          className="flex-1 mx-0.5 bg-primary/70 rounded-t-sm" 
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84.7%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +1.3% from previous period
                  </p>
                  <div className="h-[80px] mt-4 bg-muted/20 rounded-md">
                    {/* Placeholder for chart */}
                    <div className="h-full flex items-end p-2">
                      {performanceData.monthly.slice(0, 7).map((value, index) => (
                        <div 
                          key={index} 
                          className="flex-1 mx-0.5 bg-primary/70 rounded-t-sm" 
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Detailed performance metrics for all tasks across your projects.
                </p>
                {/* Placeholder for task performance content */}
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Task performance metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive project performance data and comparison metrics.
                </p>
                {/* Placeholder for project performance content */}
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Project performance metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
