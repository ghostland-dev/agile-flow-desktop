
import React, { useState } from 'react';
import { Task, Status } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksList } from '@/components/TasksList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewTaskForm } from '@/components/NewTaskForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TaskBoardProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  completedTasks: Task[];
}

export function TaskBoard({ todoTasks, inProgressTasks, completedTasks }: TaskBoardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<{ [key: string]: boolean }>({});
  
  const openDialog = (columnId: string) => {
    setIsDialogOpen(prev => ({ ...prev, [columnId]: true }));
  };

  const closeDialog = (columnId: string) => {
    setIsDialogOpen(prev => ({ ...prev, [columnId]: false }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card className="flex flex-col min-h-[200px] bg-card dark:bg-card">
        <CardHeader className="bg-muted/50 dark:bg-muted/20 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            To Do
            <Badge variant="outline" className="ml-2">
              {todoTasks.length}
            </Badge>
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 w-7 p-0 rounded-full"
            onClick={() => openDialog('todo')}
          >
            <Plus size={16} />
            <span className="sr-only">Add task</span>
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-3 flex-1 overflow-auto">
          <TasksList tasks={todoTasks} />
        </CardContent>
        
        {isDialogOpen['todo'] && (
          <Dialog 
            open={true} 
            onOpenChange={(open) => !open && closeDialog('todo')}
          >
            <DialogContent aria-describedby="new-todo-task-description">
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
                <DialogDescription id="new-todo-task-description">
                  Create a new task in the To Do column
                </DialogDescription>
              </DialogHeader>
              <NewTaskForm initialStatus="todo" openInDialog={false} />
            </DialogContent>
          </Dialog>
        )}
      </Card>
      
      <Card className="flex flex-col min-h-[200px] bg-card dark:bg-card">
        <CardHeader className="bg-muted/50 dark:bg-muted/20 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            In Progress
            <Badge variant="outline" className="ml-2">
              {inProgressTasks.length}
            </Badge>
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 w-7 p-0 rounded-full"
            onClick={() => openDialog('in_progress')}
          >
            <Plus size={16} />
            <span className="sr-only">Add task</span>
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-3 flex-1 overflow-auto">
          <TasksList tasks={inProgressTasks} />
        </CardContent>
        
        {isDialogOpen['in_progress'] && (
          <Dialog 
            open={true} 
            onOpenChange={(open) => !open && closeDialog('in_progress')}
          >
            <DialogContent aria-describedby="new-in-progress-task-description">
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
                <DialogDescription id="new-in-progress-task-description">
                  Create a new task in the In Progress column
                </DialogDescription>
              </DialogHeader>
              <NewTaskForm initialStatus="in_progress" openInDialog={false} />
            </DialogContent>
          </Dialog>
        )}
      </Card>
      
      <Card className="flex flex-col min-h-[200px] bg-card dark:bg-card">
        <CardHeader className="bg-muted/50 dark:bg-muted/20 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Completed
            <Badge variant="outline" className="ml-2">
              {completedTasks.length}
            </Badge>
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 w-7 p-0 rounded-full"
            onClick={() => openDialog('done')}
          >
            <Plus size={16} />
            <span className="sr-only">Add task</span>
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-3 flex-1 overflow-auto">
          <TasksList tasks={completedTasks} />
        </CardContent>
        
        {isDialogOpen['done'] && (
          <Dialog 
            open={true} 
            onOpenChange={(open) => !open && closeDialog('done')}
          >
            <DialogContent aria-describedby="new-done-task-description">
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
                <DialogDescription id="new-done-task-description">
                  Create a new task in the Completed column
                </DialogDescription>
              </DialogHeader>
              <NewTaskForm initialStatus="done" openInDialog={false} />
            </DialogContent>
          </Dialog>
        )}
      </Card>
    </div>
  );
}
