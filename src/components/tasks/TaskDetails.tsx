
import React from 'react';
import { Task } from '@/types/project';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TaskDetailsProps {
  task: Task | null;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  if (!task) return null;

  return (
    <DialogContent 
      className="sm:max-w-[550px]" 
      aria-describedby="view-task-description"
    >
      <DialogHeader>
        <DialogTitle>{task.title}</DialogTitle>
        <DialogDescription id="view-task-description">
          View task details
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 my-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Description:</p>
          <p className="text-sm p-3 bg-muted/20 rounded-md">{task.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status:</p>
            <Badge 
              variant="outline" 
              className={cn(
                "font-normal", 
                task.status && getStatusClasses(task.status)
              )}
            >
              {task.status === 'todo' ? 'To Do' : 
               task.status === 'in_progress' ? 'In Progress' : 
               task.status === 'in_review' ? 'In Review' : 'Done'}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Priority:</p>
            <Badge 
              variant="outline" 
              className={cn(
                "font-normal", 
                task.priority && getPriorityClasses(task.priority)
              )}
            >
              {task.priority}
            </Badge>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {task.tags?.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Due date:</p>
            <p className="text-sm">{task.dueDate ? formatDate(task.dueDate) : 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Time tracked:</p>
            <p className="text-sm">{task.timeTracked || 0} minutes</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
