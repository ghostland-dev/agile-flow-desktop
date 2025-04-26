
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectProvider';
import { useTaskContext } from '../contexts/TaskContext';
import { useTimeTracking } from '../contexts/TimeTrackingContext';
import type { ProjectContextType } from '../types/project';

export const useProject = (): ProjectContextType => {
  const projectContext = useContext(ProjectContext);
  const taskContext = useTaskContext();
  const timeContext = useTimeTracking();
  
  if (!projectContext) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  
  return {
    ...projectContext,
    ...taskContext,
    ...timeContext,
  };
};
