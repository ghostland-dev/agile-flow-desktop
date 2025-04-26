
import React from 'react';
import { Task } from '@/contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksList } from '@/components/TasksList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskBoardProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  completedTasks: Task[];
}

export function TaskBoard({ todoTasks, inProgressTasks, completedTasks }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            To Do
            <Badge variant="outline" className="ml-2">
              {todoTasks.length}
            </Badge>
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
            <Plus size={16} />
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-3">
          <TasksList tasks={todoTasks} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            In Progress
            <Badge variant="outline" className="ml-2">
              {inProgressTasks.length}
            </Badge>
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
            <Plus size={16} />
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-3">
          <TasksList tasks={inProgressTasks} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Completed
            <Badge variant="outline" className="ml-2">
              {completedTasks.length}
            </Badge>
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
            <Plus size={16} />
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-3">
          <TasksList tasks={completedTasks} />
        </CardContent>
      </Card>
    </div>
  );
}
