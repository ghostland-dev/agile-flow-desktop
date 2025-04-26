
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectProvider';
import type { ProjectContextType } from '../types/project';

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  
  return context;
};
