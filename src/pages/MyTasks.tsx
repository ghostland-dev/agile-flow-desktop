import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { NewTaskForm } from '@/components/NewTaskForm';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskListView } from '@/components/tasks/TaskListView';
import { TaskSidebar } from '@/components/tasks/TaskSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListFilter, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function MyTasks() {
  const { tasks, currentUser, projects } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
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
    <div className="w-full h-full flex-1">
      <div className="w-full h-full overflow-auto scrollbar-none">
        <div className="w-full px-4 md:px-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Tasks</h1>
                <Badge variant="outline" className="rounded-full">
                  {filteredTasks.length} tasks
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Manage and track your assigned tasks efficiently
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <TaskFilters 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterPriority={filterPriority}
                  setFilterPriority={setFilterPriority}
                  handleResetFilters={handleResetFilters}
                />
              </div>
              <NewTaskForm />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 w-full">
              <Tabs defaultValue="board" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className={cn(
                    "w-full sm:w-auto",
                    "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                  )}>
                    <TabsTrigger value="board" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
                      <ListFilter size={16} />
                      Board View
                    </TabsTrigger>
                    <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-primary/10">
                      <CheckCircle size={16} />
                      List View
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="relative">
                  <TabsContent value="board" className="mt-0 space-y-4">
                    <TaskBoard 
                      todoTasks={todoTasks}
                      inProgressTasks={inProgressTasks}
                      completedTasks={completedTasks}
                    />
                  </TabsContent>
                  
                  <TabsContent value="list" className="mt-0 space-y-4">
                    <TaskListView 
                      tasks={filteredTasks}
                      projects={projects}
                      getProjectDetails={getProjectDetails}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            {!isMobile && (
              <div className="hidden lg:block w-full">
                <div className="sticky top-4">
                  <TaskSidebar upcomingDeadlines={upcomingDeadlines} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
