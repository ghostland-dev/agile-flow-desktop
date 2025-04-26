
import React from 'react';
import { format, subDays, isWithinInterval } from 'date-fns';
import { Project, Task, TimeEntry } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeOverviewChartProps {
  timeEntries: TimeEntry[];
  projects: Project[];
  tasks: Task[];
  timeRange: 'day' | 'week' | 'month' | 'all';
}

export function TimeOverviewChart({ timeEntries, projects, tasks, timeRange }: TimeOverviewChartProps) {
  // Calculate time tracking data for the selected time range
  const now = new Date();
  let startDate: Date | undefined;
  
  if (timeRange === 'day') {
    startDate = now;
  } else if (timeRange === 'week') {
    startDate = subDays(now, 6);
  } else if (timeRange === 'month') {
    startDate = subDays(now, 29);
  }
  
  const filteredEntries = timeEntries.filter(entry => {
    if (!startDate) return true; // 'all' time range
    const entryDate = new Date(entry.startTime);
    return isWithinInterval(entryDate, { start: startDate, end: now });
  });
  
  // Aggregate time entries by project and date
  const projectTimeData: { [projectId: string]: { date: string; duration: number }[] } = {};
  
  filteredEntries.forEach(entry => {
    const task = tasks.find(t => t.id === entry.taskId);
    const project = task ? projects.find(p => p.id === task.project) : undefined;
    
    if (!project) return;
    
    const projectId = project.id;
    const entryDate = format(new Date(entry.startTime), 'yyyy-MM-dd');
    
    if (!projectTimeData[projectId]) {
      projectTimeData[projectId] = [];
    }
    
    const existingDataPoint = projectTimeData[projectId]?.find(d => d.date === entryDate);
    
    if (existingDataPoint) {
      existingDataPoint.duration += entry.duration;
    } else {
      projectTimeData[projectId]?.push({ date: entryDate, duration: entry.duration });
    }
  });
  
  // Prepare chart data
  const chartData = Object.entries(projectTimeData).map(([projectId, data]) => {
    const project = projects.find(p => p.id === projectId);
    
    return {
      name: project?.name || 'Unknown Project',
      color: project?.color || '#8884d8',
      data: data.map(item => ({
        date: item.date,
        duration: item.duration / 3600, // Convert seconds to hours
      })),
    };
  });
  
  // Generate date labels for the x-axis
  const dateLabels: string[] = [];
  let currentDate = startDate ? new Date(startDate) : subDays(now, 6);
  
  while (currentDate <= now) {
    dateLabels.push(format(currentDate, 'MMM d'));
    currentDate = subDays(new Date(now), 6);
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-6">
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.flatMap(project => project.data)}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft', offset: -5 }} />
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} hours`} />
              {chartData.map(project => (
                <Bar 
                  key={project.name} 
                  dataKey="duration" 
                  stackId="a" 
                  fill={project.color} 
                  name={project.name}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
