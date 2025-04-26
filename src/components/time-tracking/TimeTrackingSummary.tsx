
import React from 'react';
import { Task } from '@/contexts/ProjectContext';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, Calendar, BarChart } from 'lucide-react';

interface TimeTrackingSummaryProps {
  timeEntries: Array<{
    id: string;
    taskId: string;
    userId: string;
    startTime: string;
    endTime?: string;
    duration: number;
  }>;
  tasks: Task[];
}

export function TimeTrackingSummary({ timeEntries, tasks }: TimeTrackingSummaryProps) {
  // Calculate total tracked time in hours
  const totalTrackedSeconds = timeEntries.reduce((total, entry) => total + entry.duration, 0);
  const trackedHours = Math.floor(totalTrackedSeconds / 3600);
  const trackedMinutes = Math.floor((totalTrackedSeconds % 3600) / 60);
  
  // Calculate completed tasks with time entries
  const tasksWithTimeIds = new Set(timeEntries.map(entry => entry.taskId));
  const completedTasksCount = tasks.filter(task => 
    tasksWithTimeIds.has(task.id) && task.status === 'done'
  ).length;
  
  // Calculate productivity (average time per completed task)
  const avgTimePerTask = completedTasksCount > 0 
    ? Math.floor(totalTrackedSeconds / completedTasksCount / 60) 
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white hover-lift transition-all">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Total tracked time</p>
              <h3 className="text-2xl font-bold mt-1">
                {trackedHours}h {trackedMinutes}m
              </h3>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover-lift transition-all">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Tasks tracked</p>
              <h3 className="text-2xl font-bold mt-1">
                {tasksWithTimeIds.size}
              </h3>
            </div>
            <div className="bg-secondary/10 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover-lift transition-all">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Completed tasks</p>
              <h3 className="text-2xl font-bold mt-1">
                {completedTasksCount}
              </h3>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white hover-lift transition-all">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-muted-foreground text-sm">Avg. time per task</p>
              <h3 className="text-2xl font-bold mt-1">
                {avgTimePerTask} min
              </h3>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <BarChart className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
