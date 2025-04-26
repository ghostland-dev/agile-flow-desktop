
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { NewProjectCard } from '@/components/dashboard/NewProjectCard';

export default function Dashboard() {
  const { projects, tasks, loading } = useProject();
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
  let greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
  
  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <Loading text="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      <DashboardHeader 
        greeting={greeting}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <DashboardStats 
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        projectsCount={projects.length}
        overdueTasksCount={overdueTasksCount}
      />
      
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
          
          return (
            <ProjectCard
              key={project.id}
              project={project}
              completedCount={completedCount}
              totalCount={projectTasks.length}
            />
          );
        })}
        
        {(filteredProjects.length > 0 || !searchTerm) && <NewProjectCard />}
      </div>
    </div>
  );
}
