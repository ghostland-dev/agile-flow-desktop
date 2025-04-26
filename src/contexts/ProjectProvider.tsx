import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { projects, tasks, users } from '../utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import type { 
  ProjectContextType, 
  Project, 
  Task, 
  User, 
  TimeEntry, 
  FileAttachment,
  Status
} from '../types/project';

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
    setTasksList(tasksList.filter(task => task.id !== taskId));
    setTimeEntries(timeEntries.filter(entry => entry.taskId !== taskId));
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
    
    setTasksList(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          const taskEntries = timeEntries
            .filter(entry => entry.taskId === taskId && entry.endTime)
            .concat(timeEntries.filter(entry => entry.taskId === taskId && !entry.endTime)
              .map(entry => {
                const startTime = new Date(entry.startTime);
                const durationSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
                return { ...entry, duration: durationSeconds };
              })
            );
          
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
        loading,
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
