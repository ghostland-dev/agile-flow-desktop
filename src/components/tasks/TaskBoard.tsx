
import React, { useState } from 'react';
import { Task, Status } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksList } from '@/components/TasksList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewTaskForm } from '@/components/NewTaskForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

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

  const renderTaskColumn = (title: string, tasks: Task[], status: Status) => (
    <Card className={cn(
      "flex flex-col min-h-[200px] bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "transition-all duration-200 hover:bg-card/60"
    )}>
      <CardHeader className="bg-muted/30 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {title}
          <Badge variant="outline" className="animate-fade-in">
            {tasks.length}
          </Badge>
        </CardTitle>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 w-7 p-0 rounded-full hover:bg-background/80"
          onClick={() => openDialog(status)}
        >
          <Plus size={16} />
          <span className="sr-only">Add task</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-4 px-3 flex-1 overflow-auto">
        <TasksList tasks={tasks} />
      </CardContent>
      
      {isDialogOpen[status] && (
        <Dialog 
          open={true} 
          onOpenChange={(open) => !open && closeDialog(status)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new task</DialogTitle>
              <DialogDescription>
                Create a new task in the {title} column
              </DialogDescription>
            </DialogHeader>
            <NewTaskForm initialStatus={status} openInDialog={false} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
      {renderTaskColumn("To Do", todoTasks, "todo")}
      {renderTaskColumn("In Progress", inProgressTasks, "in_progress")}
      {renderTaskColumn("Completed", completedTasks, "done")}
    </div>
  );
}
