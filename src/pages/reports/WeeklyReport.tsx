
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function WeeklyReport() {
  // Données fictives pour le rapport hebdomadaire
  const weeklyData = {
    completedTasks: 24,
    newTasks: 32,
    activeProjects: 5,
    timeTracked: "127h 45m",
    previousWeekComparison: {
      completedTasks: +8,
      newTasks: -3,
      activeProjects: 0, 
      timeTracked: "+12h 30m"
    },
    dailyCompletion: [5, 4, 7, 3, 5]
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Weekly Report</h1>
            <p className="text-muted-foreground">
              Week of April 22 - April 26, 2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Export PDF</Button>
            <Button variant="outline">Email Report</Button>
            <Button>Print Report</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{weeklyData.completedTasks}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {weeklyData.previousWeekComparison.completedTasks > 0 ? (
                  <span className="text-green-500">+{weeklyData.previousWeekComparison.completedTasks}</span>
                ) : (
                  <span className="text-red-500">{weeklyData.previousWeekComparison.completedTasks}</span>
                )} from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{weeklyData.newTasks}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {weeklyData.previousWeekComparison.newTasks > 0 ? (
                  <span className="text-green-500">+{weeklyData.previousWeekComparison.newTasks}</span>
                ) : (
                  <span className="text-red-500">{weeklyData.previousWeekComparison.newTasks}</span>
                )} from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{weeklyData.activeProjects}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {weeklyData.previousWeekComparison.activeProjects > 0 ? (
                  <span className="text-green-500">+{weeklyData.previousWeekComparison.activeProjects}</span>
                ) : weeklyData.previousWeekComparison.activeProjects < 0 ? (
                  <span className="text-red-500">{weeklyData.previousWeekComparison.activeProjects}</span>
                ) : (
                  <span>No change</span>
                )} from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Time Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{weeklyData.timeTracked}</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">{weeklyData.previousWeekComparison.timeTracked}</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Task Completion</CardTitle>
            <CardDescription>Number of tasks completed each day this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 bg-muted/20 rounded-md">
              <div className="h-full flex items-end p-4 justify-around">
                {weeklyData.dailyCompletion.map((value, index) => (
                  <div key={index} className="flex flex-col items-center w-1/6">
                    <div 
                      className="w-full max-w-[40px] bg-primary/70 rounded-t-sm transition-all hover:bg-primary" 
                      style={{ height: `${(value/Math.max(...weeklyData.dailyCompletion))*80}%` }}
                    ></div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {weekDays[index]}
                    </div>
                    <div className="mt-1 text-xs font-medium">
                      {value} tasks
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Team members who completed the most tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Top performers data will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>Overview of project milestones achieved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Project progress data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Goals Status</CardTitle>
            <CardDescription>Progress towards weekly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[150px] bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Goals status will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
