import React, { createContext, useContext, useState, ReactNode } from 'react';
import { projects, tasks, users } from '../utils/mockData';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  assignee?: string;
  project: string;
  createdAt: string;
  tags: string[];
  timeTracked: number; // in minutes
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface FileAttachment {
  id: string;
  taskId: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'other';
  uploadedAt: string;
  uploadedBy: string;
}

interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number; // in seconds
}

interface ProjectContextType {
  projects: Project[];
  tasks: Task[];
  users: User[];
  currentProject: Project | null;
  currentView: 'kanban' | 'list' | 'calendar' | 'timeline';
  setCurrentProject: (project: Project | null) => void;
  setCurrentView: (view: 'kanban' | 'list' | 'calendar' | 'timeline') => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
  timeEntries: TimeEntry[];
  startTimeTracking: (taskId: string) => void;
  stopTimeTracking: (taskId: string) => void;
  getTaskTimeEntries: (taskId: string) => TimeEntry[];
  fileAttachments: FileAttachment[];
  addFileAttachment: (taskId: string, file: Pick<FileAttachment, 'name' | 'url' | 'type'>) => void;
  getTaskAttachments: (taskId: string) => FileAttachment[];
  currentUser: User | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [tasksList, setTasksList] = useState<Task[]>(tasks);
  const [usersList] = useState<User[]>(users);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>([]);
  const [currentUser] = useState<User | null>(users[0] || null);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasksList([...tasksList, newTask]);
  };

  const updateTaskStatus = (taskId: string, status: Status) => {
    setTasksList(
      tasksList.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const startTimeTracking = (taskId: string) => {
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId,
      userId: 'current-user',
      startTime: new Date().toISOString(),
      duration: 0
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const stopTimeTracking = (taskId: string) => {
    setTimeEntries(entries =>
      entries.map(entry =>
        entry.taskId === taskId && !entry.endTime
          ? {
              ...entry,
              endTime: new Date().toISOString(),
              duration: Math.floor((new Date().getTime() - new Date(entry.startTime).getTime()) / 1000)
            }
          : entry
      )
    );
  };

  const getTaskTimeEntries = (taskId: string) => {
    return timeEntries.filter(entry => entry.taskId === taskId);
  };

  const addFileAttachment = (
    taskId: string, 
    file: Pick<FileAttachment, 'name' | 'url' | 'type'>
  ) => {
    const newAttachment: FileAttachment = {
      id: `file-${Date.now()}`,
      taskId,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'current-user',
      ...file,
    };
    setFileAttachments(prev => [...prev, newAttachment]);
  };

  const getTaskAttachments = (taskId: string) => {
    return fileAttachments.filter(file => file.taskId === taskId);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: projectsList,
        tasks: tasksList,
        users: usersList,
        currentProject,
        currentView,
        setCurrentProject,
        setCurrentView,
        addTask,
        updateTaskStatus,
        timeEntries,
        startTimeTracking,
        stopTimeTracking,
        getTaskTimeEntries,
        fileAttachments,
        addFileAttachment,
        getTaskAttachments,
        currentUser,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
