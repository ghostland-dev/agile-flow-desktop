
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../contexts/ProjectContext';
import { ProjectHeader } from '../components/ProjectHeader';
import { KanbanBoard } from '../components/KanbanBoard';
import { TasksList } from '../components/TasksList';
import { CalendarView } from '../components/CalendarView';
import { TimelineView } from '../components/TimelineView';

export default function ProjectView() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, setCurrentProject, currentView } = useProject();
  
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
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'timeline' && <TimelineView />}
      </div>
    </div>
  );
}
