
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { projects, tasks, users } from '../utils/mockData';
import { useToast } from '@/hooks/use-toast';

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
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  timeEntries: TimeEntry[];
  startTimeTracking: (taskId: string) => void;
  stopTimeTracking: (taskId: string) => void;
  getTaskTimeEntries: (taskId: string) => TimeEntry[];
  fileAttachments: FileAttachment[];
  addFileAttachment: (taskId: string, file: Pick<FileAttachment, 'name' | 'url' | 'type'>) => void;
  getTaskAttachments: (taskId: string) => FileAttachment[];
  currentUser: User | null;
  getTaskById: (taskId: string) => Task | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Load data from localStorage if available
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Save data to localStorage
const saveToStorage = <T,>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export function ProjectProvider({ children }: { children: ReactNode }) {
  // Load data from localStorage or use default values
  const [projectsList, setProjectsList] = useState<Project[]>(() => 
    loadFromStorage('projects', projects)
  );
  const [tasksList, setTasksList] = useState<Task[]>(() => 
    loadFromStorage('tasks', tasks)
  );
  const [usersList] = useState<User[]>(users);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(() => 
    loadFromStorage('timeEntries', [])
  );
  const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>(() => 
    loadFromStorage('fileAttachments', [])
  );
  const [currentUser] = useState<User | null>(users[0] || null);
  const { toast } = useToast();

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToStorage('projects', projectsList);
  }, [projectsList]);

  useEffect(() => {
    saveToStorage('tasks', tasksList);
  }, [tasksList]);

  useEffect(() => {
    saveToStorage('timeEntries', timeEntries);
  }, [timeEntries]);

  useEffect(() => {
    saveToStorage('fileAttachments', fileAttachments);
  }, [fileAttachments]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasksList(prevTasks => [...prevTasks, newTask]);
  };

  const updateTaskStatus = (taskId: string, status: Status) => {
    setTasksList(
      tasksList.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const updateTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasksList(
      tasksList.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    // Delete task
    setTasksList(tasksList.filter(task => task.id !== taskId));
    
    // Delete related time entries
    setTimeEntries(timeEntries.filter(entry => entry.taskId !== taskId));
    
    // Delete related file attachments
    setFileAttachments(fileAttachments.filter(file => file.taskId !== taskId));
    
    toast({
      title: "Task deleted",
      description: "The task and all related data have been removed",
    });
  };

  const startTimeTracking = (taskId: string) => {
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId,
      userId: currentUser?.id || 'current-user',
      startTime: new Date().toISOString(),
      duration: 0
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const stopTimeTracking = (taskId: string) => {
    const now = new Date();
    
    setTimeEntries(entries => {
      const updatedEntries = entries.map(entry => {
        if (entry.taskId === taskId && !entry.endTime) {
          const startTime = new Date(entry.startTime);
          const durationSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
          const durationMinutes = Math.floor(durationSeconds / 60);
          
          return {
            ...entry,
            endTime: now.toISOString(),
            duration: durationSeconds
          };
        }
        return entry;
      });
      
      return updatedEntries;
    });
    
    // Update the task's total tracked time
    setTasksList(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          const taskEntries = timeEntries
            .filter(entry => entry.taskId === taskId && entry.endTime)
            .concat(timeEntries.filter(entry => entry.taskId === taskId && !entry.endTime)
              .map(entry => {
                const startTime = new Date(entry.startTime);
                const durationSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
                const durationMinutes = Math.floor(durationSeconds / 60);
                return { ...entry, duration: durationSeconds };
              })
            );
          
          // Calculate total duration in minutes
          const totalSeconds = taskEntries.reduce((total, entry) => total + entry.duration, 0);
          const totalMinutes = Math.floor(totalSeconds / 60);
          
          return { ...task, timeTracked: totalMinutes };
        }
        return task;
      });
    });
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
      uploadedBy: currentUser?.id || 'current-user',
      ...file,
    };
    setFileAttachments(prev => [...prev, newAttachment]);
    
    toast({
      title: "File attached",
      description: `${file.name} has been attached to the task`,
    });
  };

  const getTaskAttachments = (taskId: string) => {
    return fileAttachments.filter(file => file.taskId === taskId);
  };
  
  const getTaskById = (taskId: string) => {
    return tasksList.find(task => task.id === taskId);
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
        updateTask,
        deleteTask,
        timeEntries,
        startTimeTracking,
        stopTimeTracking,
        getTaskTimeEntries,
        fileAttachments,
        addFileAttachment,
        getTaskAttachments,
        currentUser,
        getTaskById,
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
