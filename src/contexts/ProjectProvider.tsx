import React, { createContext, useState, useEffect } from 'react';
import { projects, users } from '../utils/mockData';
import { Project, User, ProjectContextType, ProjectMember } from '../types/project';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { TaskProvider } from './TaskContext';
import { TimeTrackingProvider } from './TimeTrackingContext';
import { FileAttachmentProvider } from './FileAttachmentsContext';
import { v4 as uuidv4 } from 'uuid';

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
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    saveToStorage('projects', projectsList);
  }, [projectsList]);

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject = {
      ...projectData,
      id: uuidv4()
    };
    
    setProjectsList(prevProjects => [...prevProjects, newProject]);
  };

  const addProjectMember = (userId: string, projectId: string) => {
    const newMember: ProjectMember = {
      userId,
      projectId,
      joinedAt: new Date().toISOString(),
    };
    setProjectMembers(prev => [...prev, newMember]);
  };

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
      addProject,
      projectMembers,
      addProjectMember,
    }}>
      <TaskProvider>
        <TimeTrackingProvider>
          <FileAttachmentProvider>
            {children}
          </FileAttachmentProvider>
        </TimeTrackingProvider>
      </TaskProvider>
    </ProjectContext.Provider>
  );
}
