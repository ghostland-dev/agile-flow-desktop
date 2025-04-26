
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, Status, TaskContextType } from '../types/project';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { tasks } from '../utils/mockData';
import { useToast } from '@/hooks/use-toast';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasksList, setTasksList] = useState<Task[]>(() => 
    loadFromStorage('tasks', tasks)
  );
  const { toast } = useToast();

  useEffect(() => {
    saveToStorage('tasks', tasksList);
  }, [tasksList]);

  // Optimize with useCallback to ensure stable function references
  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasksList(prevTasks => [...prevTasks, newTask]);
  }, []);

  const updateTaskStatus = useCallback((taskId: string, status: Status) => {
    setTasksList(prevTasks =>
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
  }, []);

  const updateTask = useCallback((taskId: string, updatedTask: Partial<Task>) => {
    setTasksList(prevTasks =>
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasksList(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been removed",
    });
  }, [toast]);

  const getTaskById = useCallback((taskId: string) => {
    return tasksList.find(task => task.id === taskId);
  }, [tasksList]);

  return (
    <TaskContext.Provider value={{
      tasks: tasksList,
      addTask,
      updateTaskStatus,
      updateTask,
      deleteTask,
      getTaskById,
    }}>
      {children}
    </TaskContext.Provider>
  );
}
