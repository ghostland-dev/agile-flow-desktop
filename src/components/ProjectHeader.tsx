
import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Calendar, List, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NewTaskForm } from './NewTaskForm';

export function ProjectHeader() {
  const { currentProject, currentView, setCurrentView } = useProject();
  
  if (!currentProject) return null;
  
  const views = [
    { id: 'kanban', label: 'Board', icon: <List size={16} /> },
    { id: 'list', label: 'List', icon: <List size={16} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
  ] as const;
  
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div 
              className="h-4 w-4 rounded-full" 
              style={{ backgroundColor: currentProject.color }}
            />
            <h1 className="font-bold text-2xl">{currentProject.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Timer size={14} />
            Start Timer
          </Button>
          <NewTaskForm />
        </div>
      </div>
      
      <div className="flex border-b">
        {views.map((view) => (
          <button
            key={view.id}
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-sm border-b-2 transition-colors",
              currentView === view.id
                ? "text-primary border-primary font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted"
            )}
            onClick={() => setCurrentView(view.id)}
          >
            {view.icon}
            {view.label}
          </button>
        ))}
      </div>
    </header>
  );
}
