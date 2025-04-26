
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock, Plus, AlertTriangle, Search } from 'lucide-react';
import { Loading } from '@/components/ui/loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { projects, tasks, users, loading } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const overdueTasksCount = tasks.filter(task => 
    task.status !== 'done' && task.dueDate && new Date(task.dueDate) < new Date()
  ).length;
  
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
  
  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <Loading text="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{greeting}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening across your projects</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              {totalTasks > 0 ? ((inProgressTasks / totalTasks) * 100).toFixed(0) : 0}% of total tasks
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
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="text-2xl font-bold">{overdueTasksCount}</div>
            {overdueTasksCount > 0 && (
              <AlertTriangle className="h-5 w-5 ml-2 text-amber-500" />
            )}
            <p className="text-xs text-muted-foreground mt-1 ml-auto">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Projects</h2>
        <Link to="/stats">
          <Button variant="outline" size="sm" className="text-sm">
            View All Stats
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 && searchTerm && (
          <div className="col-span-full py-8 text-center">
            <p className="text-muted-foreground">No projects found matching "{searchTerm}"</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")} 
              className="mt-2"
            >
              Clear Search
            </Button>
          </div>
        )}
        
        {filteredProjects.map(project => {
          const projectTasks = tasks.filter(task => task.project === project.id);
          const completedCount = projectTasks.filter(task => task.status === 'done').length;
          const totalCount = projectTasks.length;
          const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          
          return (
            <Card key={project.id} className="hover:shadow-md transition-shadow border border-border/60 group">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: project.color }} 
                    />
                    <CardTitle>{project.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-1 line-clamp-2" title={project.description}>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span className={progress === 100 ? "text-green-600 font-medium" : ""}>
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`rounded-full h-2 transition-all ${progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
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
        
        {(filteredProjects.length > 0 || !searchTerm) && (
          <Card className="flex flex-col items-center justify-center p-6 border-dashed border-border/60 hover:bg-muted/50 transition-colors cursor-pointer group">
            <div className="rounded-full bg-muted p-3 group-hover:bg-primary/10 transition-colors">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="mt-4 font-medium">Create New Project</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Start tracking tasks in a new project
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
