
import React, { useState } from 'react';
import { useProject } from '../hooks/useProject';
import { Task } from '../types/project';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TaskTimer } from './TaskTimer';
import { FileAttachments } from './FileAttachments';
import { FileUploader } from './FileUploader';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { TaskStatusBadge } from './tasks/TaskStatusBadge';
import { TaskPriorityBadge } from './tasks/TaskPriorityBadge';
import { TaskMetadata } from './tasks/TaskMetadata';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { users } = useProject();
  const assignee = task.assignee ? users.find(u => u.id === task.assignee) : undefined;
  const [showUploader, setShowUploader] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
      "task-card bg-white border rounded-lg shadow-sm p-4 animate-fade-in transition-all",
      isExpanded ? "hover:shadow-md" : "hover:shadow-sm"
    )}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-base">{task.title}</h3>
        {task.priority === 'urgent' && (
          <AlertCircle size={16} className="text-red-500 ml-2 flex-shrink-0" />
        )}
      </div>
      
      <p className={cn(
        "text-sm text-gray-600 mb-3", 
        isExpanded ? "" : "line-clamp-2"
      )}>
        {task.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs bg-muted text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
      
      <TaskTimer taskId={task.id} />
      
      {(isExpanded || task.description.length < 100) && <FileAttachments taskId={task.id} />}
      
      {(isExpanded || task.description.length < 100) && (
        showUploader ? (
          <div className="mt-3">
            <FileUploader 
              taskId={task.id} 
              onUpload={() => setShowUploader(false)} 
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 h-7 text-xs"
            onClick={() => setShowUploader(true)}
          >
            <Upload size={12} className="mr-1" />
            Attach files
          </Button>
        )
      )}
      
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>
        
        <TaskMetadata 
          timeTracked={task.timeTracked}
          dueDate={task.dueDate}
          status={task.status}
        />
      </div>
    </div>
  );
}
