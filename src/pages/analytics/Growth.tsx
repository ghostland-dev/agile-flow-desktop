
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Growth() {
  // Données fictives pour les métriques de croissance
  const growthMetrics = {
    userGrowth: [5, 8, 12, 16, 18, 22, 28, 35, 42, 48, 55, 62],
    taskGrowth: [12, 18, 25, 30, 42, 58, 65, 72, 80, 95, 110, 125],
    projectGrowth: [2, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 12]
  };
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Growth Analytics</h1>
            <p className="text-muted-foreground">
              Track your platform's growth metrics and expansion over time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Export Report</Button>
            <Button>Share Insights</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Overall user growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">62</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+12.7%</span> from last month
              </p>
              <div className="h-[80px] mt-4 bg-muted/20 rounded-md">
                <div className="h-full flex items-end p-2">
                  {growthMetrics.userGrowth.map((value, index) => (
                    <div key={index} className="relative flex-1 group">
                      <div 
                        className="mx-0.5 bg-primary/70 rounded-t-sm transition-all hover:bg-primary" 
                        style={{ height: `${(value/62)*100}%` }}
                      ></div>
                      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-background border rounded p-1">
                        {value} users
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{months[0]}</span>
                <span>{months[11]}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Tasks Created</CardTitle>
              <CardDescription>Task creation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">125</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+13.6%</span> from last month
              </p>
              <div className="h-[80px] mt-4 bg-muted/20 rounded-md">
                <div className="h-full flex items-end p-2">
                  {growthMetrics.taskGrowth.map((value, index) => (
                    <div key={index} className="relative flex-1 group">
                      <div 
                        className="mx-0.5 bg-primary/70 rounded-t-sm transition-all hover:bg-primary" 
                        style={{ height: `${(value/125)*100}%` }}
                      ></div>
                      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-background border rounded p-1">
                        {value} tasks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{months[0]}</span>
                <span>{months[11]}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Projects</CardTitle>
              <CardDescription>Project growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">+20%</span> from last month
              </p>
              <div className="h-[80px] mt-4 bg-muted/20 rounded-md">
                <div className="h-full flex items-end p-2">
                  {growthMetrics.projectGrowth.map((value, index) => (
                    <div key={index} className="relative flex-1 group">
                      <div 
                        className="mx-0.5 bg-primary/70 rounded-t-sm transition-all hover:bg-primary" 
                        style={{ height: `${(value/12)*100}%` }}
                      ></div>
                      <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-background border rounded p-1">
                        {value} projects
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{months[0]}</span>
                <span>{months[11]}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="users">Users Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trends</CardTitle>
                <CardDescription>Detailed analysis of user acquisition and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed growth chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Metrics</CardTitle>
                <CardDescription>How users interact with your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Engagement metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retention">
            <Card>
              <CardHeader>
                <CardTitle>User Retention Analysis</CardTitle>
                <CardDescription>How well you're retaining users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Retention analysis will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
