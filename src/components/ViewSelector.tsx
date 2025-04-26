
import React from 'react';
import { Calendar, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProject } from '../contexts/ProjectContext';

export function ViewSelector() {
  const { currentView, setCurrentView } = useProject();
  
  const views = [
    { id: 'kanban', label: 'Board', icon: <List size={16} /> },
    { id: 'list', label: 'List', icon: <List size={16} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
  ] as const;
  
  return (
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
  );
}
