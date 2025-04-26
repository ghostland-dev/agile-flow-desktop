
import React from 'react';
import { Project, Task } from '@/contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

interface TimeOverviewChartProps {
  timeEntries: Array<{
    id: string;
    taskId: string;
    userId: string;
    startTime: string;
    endTime?: string;
    duration: number;
  }>;
  projects: Project[];
  tasks: Task[];
  timeRange: 'day' | 'week' | 'month' | 'all';
}

export function TimeOverviewChart({ timeEntries, projects, tasks, timeRange }: TimeOverviewChartProps) {
  // Calculate time spent per project
  const projectTimeData = projects.map(project => {
    // Find task IDs that belong to this project
    const projectTaskIds = tasks
      .filter(task => task.project === project.id)
      .map(task => task.id);
    
    // Filter time entries for tasks in this project
    const projectEntries = timeEntries.filter(entry => 
      projectTaskIds.includes(entry.taskId)
    );
    
    const totalTime = projectEntries.reduce((acc, entry) => acc + entry.duration, 0);
    return {
      id: project.id,
      name: project.name,
      hours: Math.max(0.1, +(totalTime / 3600).toFixed(1)), // Convert to number with + operator
      color: project.color,
    };
  }).filter(project => project.hours > 0); // Only show projects with tracked time
  
  // Calculate time spent by status
  const statusTimeData = ['backlog', 'todo', 'in_progress', 'in_review', 'done'].map(status => {
    const statusTasks = tasks.filter(task => task.status === status).map(task => task.id);
    const statusEntries = timeEntries.filter(entry => statusTasks.includes(entry.taskId));
    const totalTime = statusEntries.reduce((acc, entry) => acc + entry.duration, 0);
    
    const statusColors: Record<string, string> = {
      backlog: '#94a3b8',
      todo: '#60a5fa',
      in_progress: '#a855f7',
      in_review: '#f97316',
      done: '#22c55e'
    };
    
    const statusLabels: Record<string, string> = {
      backlog: 'Backlog',
      todo: 'To Do',
      in_progress: 'In Progress',
      in_review: 'In Review',
      done: 'Done'
    };
    
    return {
      status: statusLabels[status],
      hours: Math.max(0.1, +(totalTime / 3600).toFixed(1)), // Convert to number with + operator
      color: statusColors[status]
    };
  }).filter(statusData => statusData.hours > 0);
  
  // For time series chart - daily time tracking
  let timeSeriesData = [];
  const now = new Date();
  
  // Set the date range based on the selected time range
  let startDate = now;
  if (timeRange === 'week') {
    startDate = subDays(now, 7);
  } else if (timeRange === 'month') {
    startDate = subDays(now, 30);
  } else if (timeRange === 'day') {
    startDate = subDays(now, 1);
  } else {
    startDate = subDays(now, 30); // Default to month for "all" time range but limit chart to 30 days
  }
  
  // Generate date range
  const dateRange = eachDayOfInterval({
    start: startDate,
    end: now
  });
  
  // Prepare data for each day in the range
  timeSeriesData = dateRange.map(date => {
    const dayEntries = timeEntries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      return entryDate.toDateString() === date.toDateString();
    });
    
    const dayTotal = dayEntries.reduce((acc, entry) => acc + entry.duration, 0);
    
    return {
      date: format(date, 'MMM dd'),
      hours: Math.round((dayTotal / 3600) * 10) / 10, // Convert seconds to hours with 1 decimal
    };
  });
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Time per Project</CardTitle>
          <CardDescription>Hours tracked for each project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTimeData}>
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [`${value} hours`, 'Time Tracked']}
                  labelFormatter={(label) => `Project: ${label}`}
                />
                <Bar dataKey="hours">
                  {projectTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Time by Task Status</CardTitle>
          <CardDescription>Distribution of time across task statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusTimeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="hours"
                  nameKey="status"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} hours`, 'Time Tracked']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white lg:col-span-2">
        <CardHeader>
          <CardTitle>Daily Time Tracking</CardTitle>
          <CardDescription>Hours tracked per day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeriesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} hours`, 'Time Tracked']} />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
