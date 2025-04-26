
import React from 'react';
import { format, subDays, isWithinInterval } from 'date-fns';
import { Project, Task, TimeEntry } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimeOverviewChartProps {
  timeEntries: TimeEntry[];
  projects: Project[];
  tasks: Task[];
  timeRange: 'day' | 'week' | 'month' | 'all';
}

export function TimeOverviewChart({ timeEntries, projects, tasks, timeRange }: TimeOverviewChartProps) {
  const isMobile = useIsMobile();
  
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
  
  // Prepare data for the chart
  const aggregatedData: Record<string, Record<string, number>> = {};
  
  // Process time entries
  filteredEntries.forEach(entry => {
    const task = tasks.find(t => t.id === entry.taskId);
    const project = task ? projects.find(p => p.id === task.project) : undefined;
    
    if (!project) return;
    
    const projectId = project.id;
    const entryDate = format(new Date(entry.startTime), 'yyyy-MM-dd');
    
    if (!aggregatedData[entryDate]) {
      aggregatedData[entryDate] = {};
    }
    
    if (!aggregatedData[entryDate][projectId]) {
      aggregatedData[entryDate][projectId] = 0;
    }
    
    aggregatedData[entryDate][projectId] += entry.duration / 3600; // Convert to hours
  });
  
  // Prepare chart data in the format recharts expects
  const chartData = Object.entries(aggregatedData).map(([date, projectDurations]) => {
    const dataPoint: any = { date };
    
    Object.entries(projectDurations).forEach(([projectId, duration]) => {
      // Use the projects array passed as a prop to find the project by ID
      const project = projects.find(p => p.id === projectId);
      const projectName = project ? project.name : 'Unknown';
      dataPoint[projectName] = duration;
    });
    
    return dataPoint;
  });
  
  // Sort chart data by date
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Extract project names for bars
  const projectNames = projects
    .filter(project => filteredEntries.some(entry => {
      const task = tasks.find(t => t.id === entry.taskId);
      return task && task.project === project.id;
    }))
    .map(project => project.name);
  
  // Generate colors for bars
  const colorMap = projects.reduce((acc, project) => {
    acc[project.name] = project.color;
    return acc;
  }, {} as Record<string, string>);
  
  // Fallback if there's no data
  if (chartData.length === 0) {
    return (
      <Card className="bg-card dark:bg-card">
        <CardHeader>
          <CardTitle>Time Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] md:h-[450px] flex items-center justify-center">
          <p className="text-muted-foreground">No time tracking data available for the selected filters</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-card dark:bg-card">
      <CardHeader>
        <CardTitle>Time Overview</CardTitle>
      </CardHeader>
      <CardContent className={`pl-2 md:pl-6 pr-0 ${isMobile ? 'h-[350px]' : 'h-[450px]'}`}>
        <div className="h-full w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: isMobile ? -20 : 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'var(--foreground)', fontSize: isMobile ? 10 : 12 }}
                tickLine={{ stroke: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--foreground)' }}
              />
              <YAxis 
                label={{ 
                  value: 'Hours', 
                  angle: -90, 
                  position: 'insideLeft', 
                  offset: -5,
                  style: { fill: 'var(--foreground)' } 
                }} 
                tick={{ fill: 'var(--foreground)', fontSize: isMobile ? 10 : 12 }}
                tickLine={{ stroke: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--foreground)' }}
              />
              <Tooltip 
                formatter={(value: number) => `${value.toFixed(2)} hours`}
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)'
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              
              {projectNames.map((name) => (
                <Bar 
                  key={name}
                  dataKey={name}
                  stackId="a" 
                  fill={colorMap[name] || '#8884d8'}
                  name={name}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
