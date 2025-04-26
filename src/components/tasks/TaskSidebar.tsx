import React, { useState } from 'react';
import { Task } from '@/types/project';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { NewTaskForm } from '@/components/NewTaskForm';

interface TaskSidebarProps {
  upcomingDeadlines: Task[];
}

export function TaskSidebar({ upcomingDeadlines }: TaskSidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar size={16} />
              Upcoming Deadlines
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingDeadlines.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground p-4">
              No upcoming deadlines
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingDeadlines.map(task => (
                <div key={task.id} className="flex items-start justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.dueDate ? format(new Date(task.dueDate), 'MMMM d, yyyy') : 'No due date'}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "font-normal text-xs",
                      task.priority === 'urgent' && "bg-red-50 text-red-700 border-red-200",
                      task.priority === 'high' && "bg-orange-50 text-orange-700 border-orange-200",
                      task.priority === 'medium' && "bg-amber-50 text-amber-700 border-amber-200",
                      task.priority === 'low' && "bg-blue-50 text-blue-700 border-blue-200"
                    )}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock size={16} />
              Time Tracked
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Today</p>
                <p className="text-2xl font-semibold">2h 45m</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">This Week</p>
                <p className="text-2xl font-semibold">12h 30m</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="text-2xl font-semibold">48h 15m</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View Time Reports
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent aria-describedby="new-task-description">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription id="new-task-description">
              Create a new task with a deadline
            </DialogDescription>
          </DialogHeader>
          <NewTaskForm initialStatus="todo" openInDialog={false} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
