import React from 'react';
import { format } from 'date-fns';
import { Project, Task, User, TimeEntry } from '@/types/project';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Download } from 'lucide-react';

interface TimeLogTableProps {
  timeEntries: TimeEntry[];
  tasks: Record<string, Task>;
  projects: Record<string, Project>;
  users: Record<string, User>;
}

export function TimeLogTable({ timeEntries, tasks, projects, users }: TimeLogTableProps) {
  // Helper function to get task details
  const getTaskDetails = (taskId: string): Task | undefined => {
    return Object.values(tasks).find(task => task.id === taskId);
  };
  
  // Helper function to get project details
  const getProjectDetails = (projectId: string): Project | undefined => {
    return Object.values(projects).find(project => project.id === projectId);
  };
  
  // Helper function to get user details
  const getUserDetails = (userId: string): User | undefined => {
    return Object.values(users).find(user => user.id === userId);
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeEntries.map(entry => {
          const task = getTaskDetails(entry.taskId);
          const project = task ? getProjectDetails(task.project) : undefined;
          const user = getUserDetails(entry.userId);
          
          return (
            <TableRow key={entry.id}>
              <TableCell>{task?.title || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {project && (
                    <div 
                      className="h-2 w-2 rounded-full" 
                      style={{ backgroundColor: project.color }} 
                    />
                  )}
                  {project?.name || 'N/A'}
                </div>
              </TableCell>
              <TableCell>{user?.name || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-muted-foreground" />
                  {format(new Date(entry.startTime), 'MMM d, yyyy h:mm a')}
                </div>
              </TableCell>
              <TableCell>
                {entry.endTime ? (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-muted-foreground" />
                    {format(new Date(entry.endTime), 'MMM d, yyyy h:mm a')}
                  </div>
                ) : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-muted-foreground" />
                  {entry.duration} seconds
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
