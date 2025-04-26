
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { NewTaskForm } from '@/components/NewTaskForm';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskListView } from '@/components/tasks/TaskListView';
import { TaskSidebar } from '@/components/tasks/TaskSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListFilter, CheckCircle } from 'lucide-react';

export default function MyTasks() {
  const { tasks, currentUser, projects } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  
  // Get all tasks assigned to current user
  const myTasks = tasks.filter(task => task.assignee === currentUser?.id);
  
  // Filter tasks based on search term and priority filter
  const filteredTasks = myTasks.filter(task => {
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesPriority = !filterPriority || task.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });
  
  // Group by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in_progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'done');
  
  // Get upcoming deadlines
  const upcomingDeadlines = filteredTasks
    .filter(task => task.status !== 'done' && task.dueDate)
    .sort((a, b) => {
      const dateA = new Date(a.dueDate || '');
      const dateB = new Date(b.dueDate || '');
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterPriority(null);
  };
  
  // Helper to get project details
  const getProjectDetails = (projectId: string) => {
    return projects.find(p => p.id === projectId);
  };

  return (
    <div className="flex-1 p-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage and track your assigned tasks</p>
          </div>
          
          <div className="flex items-center gap-3">
            <TaskFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterPriority={filterPriority}
              setFilterPriority={setFilterPriority}
              handleResetFilters={handleResetFilters}
            />
            <NewTaskForm />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="board" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="board" className="flex items-center gap-2">
                    <ListFilter size={16} />
                    Board View
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    List View
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="board" className="mt-0">
                <TaskBoard 
                  todoTasks={todoTasks}
                  inProgressTasks={inProgressTasks}
                  completedTasks={completedTasks}
                />
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <TaskListView 
                  tasks={filteredTasks}
                  projects={projects}
                  getProjectDetails={getProjectDetails}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <TaskSidebar upcomingDeadlines={upcomingDeadlines} />
        </div>
      </div>
    </div>
  );
}
