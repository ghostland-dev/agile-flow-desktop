
import React from 'react';
import { useProject } from '../hooks/useProject';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock, Plus } from 'lucide-react';

export default function Dashboard() {
  const { projects, tasks, users } = useProject();
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  
  // Today's date for greeting
  const today = new Date();
  const hours = today.getHours();
  let greeting = '';
  
  if (hours < 12) {
    greeting = 'Good morning';
  } else if (hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">{greeting}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening across your projects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedTasks} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((inProgressTasks / totalTasks) * 100).toFixed(0)}% of total tasks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active projects
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-8">Your Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => {
          const projectTasks = tasks.filter(task => task.project === project.id);
          const completedCount = projectTasks.filter(task => task.status === 'done').length;
          const totalCount = projectTasks.length;
          const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          
          return (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                    <CardTitle>{project.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-1">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle size={14} />
                      <span>{completedCount}/{totalCount}</span>
                    </div>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Project
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        <Card className="flex flex-col items-center justify-center p-6 border-dashed hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="rounded-full bg-muted p-3">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-medium">Create New Project</h3>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Start tracking tasks in a new project
          </p>
        </Card>
      </div>
    </div>
  );
}
