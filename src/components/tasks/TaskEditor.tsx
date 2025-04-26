
import React from 'react';
import { Task } from '@/types/project';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface TaskEditorProps {
  task: Task | null;
  formValues: Partial<Task> & { tags?: string[] | string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TaskEditor({ 
  task, 
  formValues, 
  onInputChange, 
  onSelectChange, 
  onSubmit, 
  onCancel 
}: TaskEditorProps) {
  if (!task) return null;

  return (
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
      <form onSubmit={onSubmit} className="space-y-4 mt-2">
        <div>
          <Input 
            name="title" 
            value={formValues.title || ''} 
            onChange={onInputChange} 
            placeholder="Task title" 
            className="w-full" 
          />
        </div>
        
        <div>
          <Textarea 
            name="description" 
            value={formValues.description || ''} 
            onChange={onInputChange} 
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
              onValueChange={(value) => onSelectChange('status', value)}
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
              onValueChange={(value) => onSelectChange('priority', value)}
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
            onChange={onInputChange}
            placeholder="design, frontend, bug..."
            className="w-full"
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Update
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
