
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Card, CardContent } from '@/components/ui/card';
import { TimeOverviewChart } from '@/components/time-tracking/TimeOverviewChart';
import { TimeTrackingFilter } from '@/components/time-tracking/TimeTrackingFilter';
import { TimeLogTable } from '@/components/time-tracking/TimeLogTable';
import { TimeTrackingSummary } from '@/components/time-tracking/TimeTrackingSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <ScrollArea className="flex-1 h-[calc(100vh-3.5rem)]">
      <div className="space-y-6 p-4 md:p-6 pb-12">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Time Tracking</h1>
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
    </ScrollArea>
  );
}
