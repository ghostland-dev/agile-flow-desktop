
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../contexts/ProjectContext';
import { ProjectHeader } from '../components/ProjectHeader';
import { KanbanBoard } from '../components/KanbanBoard';
import { TasksList } from '../components/TasksList';

export default function ProjectView() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, setCurrentProject, currentView } = useProject();
  
  // Find the current project
  useEffect(() => {
    const project = projects.find(p => p.id === projectId) || null;
    setCurrentProject(project);
  }, [projectId, projects, setCurrentProject]);
  
  return (
    <div className="flex flex-col flex-1">
      <ProjectHeader />
      
      <div className="flex-1 overflow-auto bg-background">
        {currentView === 'kanban' && <KanbanBoard />}
        {currentView === 'list' && <TasksList />}
        {currentView === 'calendar' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Calendar view coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
