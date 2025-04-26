
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectProvider';
import { useTaskContext } from '../contexts/TaskContext';
import { useTimeTracking } from '../contexts/TimeTrackingContext';
import { useFileAttachments } from '../contexts/FileAttachmentsContext';
import type { CombinedContextType } from '../types/project';

export const useProject = (): CombinedContextType => {
  const projectContext = useContext(ProjectContext);
  const taskContext = useTaskContext();
  const timeContext = useTimeTracking();
  const fileContext = useFileAttachments();
  
  if (!projectContext) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  
  return {
    ...projectContext,
    ...taskContext,
    ...timeContext,
    ...fileContext,
  };
};
