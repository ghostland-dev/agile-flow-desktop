
import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksList } from '@/components/TasksList';

export default function MyTasks() {
  const { tasks, currentUser } = useProject();
  const myTasks = tasks.filter(task => task.assignee === currentUser?.id);
  
  const todoTasks = myTasks.filter(task => task.status === 'todo');
  const inProgressTasks = myTasks.filter(task => task.status === 'in_progress');
  const completedTasks = myTasks.filter(task => task.status === 'done');
  
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground mt-1">Manage and track your assigned tasks</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <TasksList tasks={todoTasks} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <TasksList tasks={inProgressTasks} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <TasksList tasks={completedTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
