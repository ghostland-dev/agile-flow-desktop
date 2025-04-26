
import React from 'react';
import { format } from 'date-fns';
import { Project, Task, User, TimeEntry } from '@/types/project';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimeLogTableProps {
  timeEntries: TimeEntry[];
  tasks: Task[];
  projects: Project[];
  users: User[];
}

export function TimeLogTable({ timeEntries, tasks, projects, users }: TimeLogTableProps) {
  const isMobile = useIsMobile();
  
  // Helper function to get task details
  const getTaskDetails = (taskId: string): Task | undefined => {
    return tasks.find(task => task.id === taskId);
  };
  
  // Helper function to get project details
  const getProjectDetails = (projectId: string): Project | undefined => {
    return projects.find(project => project.id === projectId);
  };
  
  // Helper function to get user details
  const getUserDetails = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <Card className="bg-card dark:bg-card">
      <ScrollArea className="h-[60vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground">Task</TableHead>
              {!isMobile && (
                <>
                  <TableHead className="text-foreground">Project</TableHead>
                  <TableHead className="text-foreground">User</TableHead>
                </>
              )}
              <TableHead className="text-foreground">Start Time</TableHead>
              {!isMobile && <TableHead className="text-foreground">End Time</TableHead>}
              <TableHead className="text-foreground">Duration</TableHead>
              {!isMobile && <TableHead className="text-right text-foreground">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeEntries.map(entry => {
              const task = getTaskDetails(entry.taskId);
              const project = task ? getProjectDetails(task.project) : undefined;
              const user = getUserDetails(entry.userId);
              
              return (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium text-foreground">{task?.title || 'N/A'}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {project && (
                            <div 
                              className="h-2 w-2 rounded-full" 
                              style={{ backgroundColor: project.color }} 
                            />
                          )}
                          <span className="text-foreground">{project?.name || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{user?.name || 'N/A'}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{format(new Date(entry.startTime), 'MMM d, yyyy h:mm a')}</span>
                    </div>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      {entry.endTime ? (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span className="text-foreground">{format(new Date(entry.endTime), 'MMM d, yyyy h:mm a')}</span>
                        </div>
                      ) : 'N/A'}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{entry.duration} seconds</span>
                    </div>
                  </TableCell>
                  {!isMobile && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download size={16} className="mr-2" />
                        Export
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
