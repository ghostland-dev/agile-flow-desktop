
import React, { createContext, useState, useEffect } from 'react';
import { projects, users } from '../utils/mockData';
import { Project, User, ProjectContextType } from '../types/project';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { TaskProvider } from './TaskContext';
import { TimeTrackingProvider } from './TimeTrackingContext';

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [projectsList, setProjectsList] = useState<Project[]>(() => 
    loadFromStorage('projects', projects)
  );
  const [usersList] = useState<User[]>(users);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [currentUser] = useState<User | null>(users[0] || null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    saveToStorage('projects', projectsList);
  }, [projectsList]);

  return (
    <ProjectContext.Provider value={{
      projects: projectsList,
      users: usersList,
      currentProject,
      currentView,
      currentUser,
      loading,
      setCurrentProject,
      setCurrentView,
    }}>
      <TaskProvider>
        <TimeTrackingProvider>
          {children}
        </TimeTrackingProvider>
      </TaskProvider>
    </ProjectContext.Provider>
  );
}
