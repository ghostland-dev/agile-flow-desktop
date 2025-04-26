
import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksList } from '@/components/TasksList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, Clock, ListFilter, Plus, Search } from 'lucide-react';
import { format } from 'date-fns';
import { NewTaskForm } from '@/components/NewTaskForm';

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
  const today = new Date();
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-60 pl-9"
              />
            </div>
            {(searchTerm || filterPriority) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
              >
                Clear filters
              </Button>
            )}
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
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className={filterPriority === 'urgent' ? 'bg-red-50 text-red-700 border-red-200' : ''} onClick={() => setFilterPriority(filterPriority === 'urgent' ? null : 'urgent')}>
                    Urgent
                  </Button>
                  <Button variant="outline" size="sm" className={filterPriority === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''} onClick={() => setFilterPriority(filterPriority === 'high' ? null : 'high')}>
                    High
                  </Button>
                  <Button variant="outline" size="sm" className={filterPriority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''} onClick={() => setFilterPriority(filterPriority === 'medium' ? null : 'medium')}>
                    Medium
                  </Button>
                  <Button variant="outline" size="sm" className={filterPriority === 'low' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''} onClick={() => setFilterPriority(filterPriority === 'low' ? null : 'low')}>
                    Low
                  </Button>
                </div>
              </div>
            
              <TabsContent value="board" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        To Do
                        <Badge variant="outline" className="ml-2">
                          {todoTasks.length}
                        </Badge>
                      </CardTitle>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                        <Plus size={16} />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4 px-3">
                      <TasksList tasks={todoTasks} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        In Progress
                        <Badge variant="outline" className="ml-2">
                          {inProgressTasks.length}
                        </Badge>
                      </CardTitle>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                        <Plus size={16} />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4 px-3">
                      <TasksList tasks={inProgressTasks} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-muted/50 pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        Completed
                        <Badge variant="outline" className="ml-2">
                          {completedTasks.length}
                        </Badge>
                      </CardTitle>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                        <Plus size={16} />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4 px-3">
                      <TasksList tasks={completedTasks} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-2 border-b grid grid-cols-12 text-xs font-medium text-muted-foreground">
                        <div className="col-span-5 px-3 py-2">Task Name</div>
                        <div className="col-span-2 px-3 py-2">Project</div>
                        <div className="col-span-2 px-3 py-2">Due Date</div>
                        <div className="col-span-1 px-3 py-2">Priority</div>
                        <div className="col-span-2 px-3 py-2">Status</div>
                      </div>
                      {filteredTasks.length === 0 ? (
                        <div className="px-3 py-8 text-center text-muted-foreground">
                          No tasks found. Try clearing your filters or creating new tasks.
                        </div>
                      ) : (
                        filteredTasks.map(task => {
                          const project = getProjectDetails(task.project);
                          return (
                            <div key={task.id} className="grid grid-cols-12 border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                              <div className="col-span-5 px-3 py-3 flex items-center">
                                <CheckCircle size={16} className={cn(
                                  "mr-2",
                                  task.status === 'done' 
                                    ? "text-green-500" 
                                    : "text-muted-foreground/30"
                                )} />
                                <span className={cn(
                                  task.status === 'done' && "line-through text-muted-foreground"
                                )}>{task.title}</span>
                              </div>
                              <div className="col-span-2 px-3 py-3 flex items-center">
                                <div className="flex items-center">
                                  <div 
                                    className="h-3 w-3 rounded-full mr-2" 
                                    style={{ backgroundColor: project?.color }}
                                  />
                                  <span className="text-sm">{project?.name}</span>
                                </div>
                              </div>
                              <div className="col-span-2 px-3 py-3 flex items-center text-sm">
                                {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : '-'}
                              </div>
                              <div className="col-span-1 px-3 py-3 flex items-center">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "font-normal text-xs capitalize",
                                    task.priority === 'urgent' && "bg-red-50 text-red-700 border-red-200",
                                    task.priority === 'high' && "bg-orange-50 text-orange-700 border-orange-200",
                                    task.priority === 'medium' && "bg-amber-50 text-amber-700 border-amber-200",
                                    task.priority === 'low' && "bg-blue-50 text-blue-700 border-blue-200"
                                  )}
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="col-span-2 px-3 py-3 flex items-center">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "font-normal text-xs",
                                    task.status === 'todo' && "bg-gray-50 text-gray-700 border-gray-200",
                                    task.status === 'in_progress' && "bg-blue-50 text-blue-700 border-blue-200",
                                    task.status === 'done' && "bg-green-50 text-green-700 border-green-200"
                                  )}
                                >
                                  {task.status === 'todo' ? 'To Do' : 
                                   task.status === 'in_progress' ? 'In Progress' : 'Done'}
                                </Badge>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar size={16} />
                    Upcoming Deadlines
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Plus size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingDeadlines.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground p-4">
                    No upcoming deadlines
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingDeadlines.map(task => (
                      <div key={task.id} className="flex items-start justify-between border-b pb-3 last:border-b-0 last:pb-0">
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.dueDate ? format(new Date(task.dueDate), 'MMMM d, yyyy') : 'No due date'}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "font-normal text-xs",
                            task.priority === 'urgent' && "bg-red-50 text-red-700 border-red-200",
                            task.priority === 'high' && "bg-orange-50 text-orange-700 border-orange-200",
                            task.priority === 'medium' && "bg-amber-50 text-amber-700 border-amber-200",
                            task.priority === 'low' && "bg-blue-50 text-blue-700 border-blue-200"
                          )}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock size={16} />
                    Time Tracked
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Today</p>
                      <p className="text-2xl font-semibold">2h 45m</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">This Week</p>
                      <p className="text-2xl font-semibold">12h 30m</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">This Month</p>
                      <p className="text-2xl font-semibold">48h 15m</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Time Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for className conditionals
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
