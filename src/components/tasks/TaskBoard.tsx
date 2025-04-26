
import React from 'react';
import { Task, Status } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksList } from '@/components/TasksList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewTaskForm } from '@/components/NewTaskForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TaskBoardProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  completedTasks: Task[];
}

export function TaskBoard({ todoTasks, inProgressTasks, completedTasks }: TaskBoardProps) {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                <Plus size={16} />
                <span className="sr-only">Add task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
              </DialogHeader>
              <NewTaskForm initialStatus="todo" openInDialog={false} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-4 px-3 flex-1 overflow-auto">
          <TasksList tasks={todoTasks} />
        </CardContent>
      </Card>
      
      <Card className="flex flex-col min-h-[200px] bg-card dark:bg-card">
        <CardHeader className="bg-muted/50 dark:bg-muted/20 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            In Progress
            <Badge variant="outline" className="ml-2">
              {inProgressTasks.length}
            </Badge>
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                <Plus size={16} />
                <span className="sr-only">Add task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
              </DialogHeader>
              <NewTaskForm initialStatus="in_progress" openInDialog={false} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-4 px-3 flex-1 overflow-auto">
          <TasksList tasks={inProgressTasks} />
        </CardContent>
      </Card>
      
      <Card className="flex flex-col min-h-[200px] bg-card dark:bg-card">
        <CardHeader className="bg-muted/50 dark:bg-muted/20 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Completed
            <Badge variant="outline" className="ml-2">
              {completedTasks.length}
            </Badge>
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                <Plus size={16} />
                <span className="sr-only">Add task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
              </DialogHeader>
              <NewTaskForm initialStatus="done" openInDialog={false} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-4 px-3 flex-1 overflow-auto">
          <TasksList tasks={completedTasks} />
        </CardContent>
      </Card>
    </div>
  );
}
