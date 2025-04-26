
import React from 'react';
import { Project, Task, User } from '@/contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface TimeLogTableProps {
  timeEntries: Array<{
    id: string;
    taskId: string;
    userId: string;
    startTime: string;
    endTime?: string;
    duration: number;
  }>;
  tasks: Task[];
  projects: Project[];
  users: User[];
}

export function TimeLogTable({ timeEntries, tasks, projects, users }: TimeLogTableProps) {
  // Sort entries by start time (newest first)
  const sortedEntries = [...timeEntries].sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });
  
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  
  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };
  
  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };
  
  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };
  
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Time Log Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="bg-muted/50 p-2 border-b grid grid-cols-12 text-xs font-medium text-muted-foreground">
            <div className="col-span-2 px-3 py-2">Date</div>
            <div className="col-span-2 px-3 py-2">User</div>
            <div className="col-span-3 px-3 py-2">Task</div>
            <div className="col-span-2 px-3 py-2">Project</div>
            <div className="col-span-2 px-3 py-2">Start Time</div>
            <div className="col-span-1 px-3 py-2">Duration</div>
          </div>
          
          <div className="divide-y">
            {sortedEntries.map(entry => {
              const task = getTaskById(entry.taskId);
              const project = task ? getProjectById(task.project) : undefined;
              const user = getUserById(entry.userId);
              
              if (!task || !project || !user) return null;
              
              return (
                <div key={entry.id} className="grid grid-cols-12 hover:bg-muted/20 transition-colors">
                  <div className="col-span-2 px-3 py-3 text-sm">
                    {format(new Date(entry.startTime), 'MMM dd, yyyy')}
                  </div>
                  <div className="col-span-2 px-3 py-3 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <div className="col-span-3 px-3 py-3 text-sm">
                    {task.title}
                  </div>
                  <div className="col-span-2 px-3 py-3 flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm">{project.name}</span>
                  </div>
                  <div className="col-span-2 px-3 py-3 text-sm">
                    {format(new Date(entry.startTime), 'h:mm a')}
                  </div>
                  <div className="col-span-1 px-3 py-3 text-sm">
                    {formatDuration(entry.duration)}
                  </div>
                </div>
              );
            })}
            
            {sortedEntries.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No time entries found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
