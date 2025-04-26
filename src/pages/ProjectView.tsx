
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../contexts/ProjectContext';
import { ProjectHeader } from '../components/ProjectHeader';
import { KanbanBoard } from '../components/KanbanBoard';
import { TasksList } from '../components/TasksList';
import { CalendarView } from '../components/CalendarView';
import { TimelineView } from '../components/TimelineView';
import { ProjectStats } from '../components/ProjectStats';
import { ProjectTeam } from '../components/ProjectTeam';
import { Card, CardContent } from '../components/ui/card';

export default function ProjectView() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, tasks, setCurrentProject, currentView } = useProject();
  
  useEffect(() => {
    const project = projects.find(p => p.id === projectId) || null;
    setCurrentProject(project);
  }, [projectId, projects, setCurrentProject]);
  
  const projectTasks = projectId ? tasks.filter(task => task.project === projectId) : [];
  
  return (
    <div className="flex flex-col flex-1">
      <ProjectHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <ProjectStats tasks={projectTasks} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <ProjectTeam />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-auto bg-background p-4">
        {currentView === 'kanban' && <KanbanBoard />}
        {currentView === 'list' && <TasksList tasks={projectTasks} />}
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'timeline' && <TimelineView />}
      </div>
    </div>
  );
}
