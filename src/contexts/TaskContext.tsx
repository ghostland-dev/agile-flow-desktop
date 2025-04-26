
import React, { createContext, useContext, useState, useEffect } from 'react';
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
    toast({
      title: "Task deleted",
      description: "The task has been removed",
    });
  };

  const getTaskById = (taskId: string) => {
    return tasksList.find(task => task.id === taskId);
  };

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
