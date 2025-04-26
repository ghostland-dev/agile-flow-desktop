
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface DashboardStatsProps {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  projectsCount: number;
  overdueTasksCount: number;
}

export function DashboardStats({
  totalTasks,
  completedTasks,
  inProgressTasks,
  projectsCount,
  overdueTasksCount,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedTasks} completed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTasks}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalTasks > 0 ? ((inProgressTasks / totalTasks) * 100).toFixed(0) : 0}% of total tasks
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectsCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Active projects
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <div className="text-2xl font-bold">{overdueTasksCount}</div>
          {overdueTasksCount > 0 && (
            <AlertTriangle className="h-5 w-5 ml-2 text-amber-500" />
          )}
          <p className="text-xs text-muted-foreground mt-1 ml-auto">
            Needs attention
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
