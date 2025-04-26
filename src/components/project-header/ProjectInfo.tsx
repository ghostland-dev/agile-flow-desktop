
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useProject } from '@/hooks/useProject';

export function ProjectInfo() {
  const { currentProject, tasks } = useProject();
  
  if (!currentProject) return null;
  
  // Calculate project stats
  const totalTasks = tasks.filter(task => task.project === currentProject.id).length;
  const completedTasks = tasks.filter(task => task.project === currentProject.id && task.status === 'done').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div 
        className="h-10 w-10 rounded-lg flex items-center justify-center" 
        style={{ backgroundColor: currentProject.color }}
      >
        <span className="text-white font-bold text-xl">{currentProject.name.charAt(0)}</span>
      </div>
      <div>
        <h1 className="font-bold text-2xl flex items-center gap-2">
          {currentProject.name}
          <Badge variant="outline" className="ml-2 font-normal">
            {completionPercentage}% complete
          </Badge>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
      </div>
    </div>
  );
}
