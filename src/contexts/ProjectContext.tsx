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
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [tasksList, setTasksList] = useState<Task[]>(tasks);
  const [usersList] = useState<User[]>(users);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

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
      userId: 'current-user', // In a real app, this would come from auth
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
