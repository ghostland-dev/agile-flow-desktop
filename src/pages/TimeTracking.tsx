
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TimeOverviewChart } from '@/components/time-tracking/TimeOverviewChart';
import { TimeTrackingFilter } from '@/components/time-tracking/TimeTrackingFilter';
import { TimeLogTable } from '@/components/time-tracking/TimeLogTable';
import { TimeTrackingSummary } from '@/components/time-tracking/TimeTrackingSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TimeTracking() {
  const { timeEntries, projects, tasks, users } = useProject();
  const [selectedProject, setSelectedProject] = useState<string | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<string | 'all'>('all');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'all'>('week');
  
  // Filter time entries based on selection
  const filteredEntries = timeEntries.filter(entry => {
    const matchesProject = selectedProject === 'all' || 
      tasks.find(t => t.id === entry.taskId)?.project === selectedProject;
    
    const matchesUser = selectedUser === 'all' || entry.userId === selectedUser;
    
    // Time range filter
    const entryDate = new Date(entry.startTime);
    const now = new Date();
    let isInRange = true;
    
    if (timeRange === 'day') {
      // Today only
      isInRange = entryDate.toDateString() === now.toDateString();
    } else if (timeRange === 'week') {
      // Last 7 days
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      isInRange = entryDate >= weekAgo;
    } else if (timeRange === 'month') {
      // Last 30 days
      const monthAgo = new Date();
      monthAgo.setDate(now.getDate() - 30);
      isInRange = entryDate >= monthAgo;
    }
    
    return matchesProject && matchesUser && isInRange;
  });
  
  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Time Tracking</h1>
        <p className="text-muted-foreground mt-1">Monitor time spent across projects and tasks</p>
      </div>
      
      <TimeTrackingFilter 
        projects={projects} 
        users={users}
        selectedProject={selectedProject}
        selectedUser={selectedUser}
        timeRange={timeRange}
        onProjectChange={setSelectedProject}
        onUserChange={setSelectedUser}
        onTimeRangeChange={setTimeRange}
      />
      
      <TimeTrackingSummary timeEntries={filteredEntries} tasks={tasks} />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Time Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6 mt-2">
          <TimeOverviewChart 
            timeEntries={filteredEntries} 
            projects={projects} 
            tasks={tasks}
            timeRange={timeRange}
          />
        </TabsContent>
        <TabsContent value="logs" className="mt-2">
          <TimeLogTable 
            timeEntries={filteredEntries}
            tasks={tasks}
            projects={projects}
            users={users}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
