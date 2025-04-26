
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Task } from '../types/project';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, Calendar, CheckCircle, Clock, Edit, Eye, Trash2 } from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface TasksListProps {
  tasks: Task[];
}

export const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  const { updateTask, deleteTask } = useProject();
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [deleteConfirmTask, setDeleteConfirmTask] = useState<Task | null>(null);
  // Fix the type definition to properly handle string or string[] for tags
  const [formValues, setFormValues] = useState<Partial<Task & { tags: string[] | string }>>({});

  const getPriorityClasses = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusClasses = (status: string) => {
    switch(status) {
      case 'done':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return format(date, 'MMM d');
  };

  const isDueSoon = (dateString?: string) => {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    
    return isAfter(date, today) && !isAfter(date, threeDaysLater);
  };

  const isPastDue = (dateString?: string) => {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return isAfter(today, date);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setFormValues({ 
      ...task,
      tags: task.tags?.join(', ') || ''
    });
  };

  const handleViewClick = (task: Task) => {
    setViewingTask(task);
  };

  const handleDeleteClick = (task: Task) => {
    setDeleteConfirmTask(task);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmTask) {
      deleteTask(deleteConfirmTask.id);
      setDeleteConfirmTask(null);
      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted"
      });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && formValues) {
      let tagsArray: string[] = [];
      
      // Ensure we properly convert tags to string array regardless of current type
      if (typeof formValues.tags === 'string') {
        tagsArray = formValues.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      } else if (Array.isArray(formValues.tags)) {
        tagsArray = formValues.tags;
      }

      updateTask(editingTask.id, {
        ...formValues,
        tags: tagsArray
      });
      
      setEditingTask(null);
      toast({
        title: "Task updated",
        description: "The task has been successfully modified"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground animate-fade-in">
          No tasks found. Create a new task to get started.
        </div>
      ) : (
        tasks.map(task => (
          <div 
            key={task.id} 
            className="p-4 bg-card border rounded-lg shadow-sm hover:shadow transition-all animate-fade-in hover:translate-y-[-2px]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-base">{task.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
              </div>
              {task.priority === 'urgent' && (
                <AlertCircle size={16} className="text-red-500 ml-2 flex-shrink-0" />
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {task.tags && task.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-2 border-t border-border/40 gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn("font-normal text-xs", getPriorityClasses(task.priority))}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                
                <Badge 
                  variant="outline" 
                  className={cn("font-normal text-xs", getStatusClasses(task.status))}
                >
                  {task.status === 'todo' ? 'To Do' : 
                   task.status === 'in_progress' ? 'In Progress' : 
                   task.status === 'in_review' ? 'In Review' : 'Done'}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {task.timeTracked > 0 && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock size={12} className="mr-1" />
                    {task.timeTracked}m
                  </div>
                )}
                
                {task.dueDate && (
                  <div className={cn(
                    "flex items-center text-xs gap-1", 
                    isPastDue(task.dueDate) ? "text-red-600 font-medium" : 
                    isDueSoon(task.dueDate) ? "text-amber-600" : 
                    "text-gray-600"
                  )}>
                    <Calendar size={12} />
                    {formatDate(task.dueDate)}
                    {isPastDue(task.dueDate) && " (overdue)"}
                  </div>
                )}
                
                {task.status === 'done' && (
                  <div className="text-green-600 flex items-center text-xs">
                    <CheckCircle size={12} className="mr-1" />
                    Complete
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-border/40 flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => handleViewClick(task)}
              >
                <Eye size={16} className="mr-1" />
                View
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={() => handleEditClick(task)}
              >
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" 
                onClick={() => handleDeleteClick(task)}
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))
      )}

      <Dialog open={!!viewingTask} onOpenChange={(open) => !open && setViewingTask(null)}>
        <DialogContent 
          className="sm:max-w-[550px]" 
          aria-describedby="view-task-description"
        >
          <DialogHeader>
            <DialogTitle>{viewingTask?.title}</DialogTitle>
            <DialogDescription id="view-task-description" className="sr-only">
              View task details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description:</p>
              <p className="text-sm p-3 bg-muted/20 rounded-md">{viewingTask?.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status:</p>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "font-normal", 
                    viewingTask?.status && getStatusClasses(viewingTask.status)
                  )}
                >
                  {viewingTask?.status === 'todo' ? 'To Do' : 
                   viewingTask?.status === 'in_progress' ? 'In Progress' : 
                   viewingTask?.status === 'in_review' ? 'In Review' : 'Done'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Priority:</p>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "font-normal", 
                    viewingTask?.priority && getPriorityClasses(viewingTask.priority)
                  )}
                >
                  {viewingTask?.priority}
                </Badge>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {viewingTask?.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Due date:</p>
                <p className="text-sm">{viewingTask?.dueDate ? formatDate(viewingTask.dueDate) : 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time tracked:</p>
                <p className="text-sm">{viewingTask?.timeTracked || 0} minutes</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent 
          className="sm:max-w-[550px]" 
          aria-describedby="edit-task-description"
        >
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription id="edit-task-description" className="sr-only">
              Edit task details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
            <div>
              <Input 
                name="title" 
                value={formValues.title || ''} 
                onChange={handleInputChange} 
                placeholder="Task title" 
                className="w-full" 
              />
            </div>
            
            <div>
              <Textarea 
                name="description" 
                value={formValues.description || ''} 
                onChange={handleInputChange} 
                placeholder="Task description" 
                className="w-full" 
                rows={4} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Status:</p>
                <Select 
                  value={formValues.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Priority:</p>
                <Select 
                  value={formValues.priority} 
                  onValueChange={(value) => handleSelectChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Tags (separated by commas):</p>
              <Input 
                name="tags"
                value={typeof formValues.tags === 'string' ? formValues.tags : formValues.tags?.join(', ') || ''}
                onChange={handleInputChange}
                placeholder="design, frontend, bug..."
                className="w-full"
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingTask(null)}>
                Cancel
              </Button>
              <Button type="submit">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirmTask} onOpenChange={(open) => !open && setDeleteConfirmTask(null)}>
        <DialogContent 
          className="sm:max-w-[400px]"
          aria-describedby="delete-task-description" 
        >
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription id="delete-task-description">
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmTask(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
