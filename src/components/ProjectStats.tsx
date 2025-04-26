
import React from 'react';
import { Task } from '../contexts/ProjectContext';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, AlertTriangle } from 'lucide-react';

interface ProjectStatsProps {
  tasks: Task[];
}

export function ProjectStats({ tasks }: ProjectStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const urgent = tasks.filter(t => t.priority === 'urgent').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Project Overview</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <Check className="text-green-600" />
          <div>
            <p className="text-sm text-green-600">Completed</p>
            <p className="text-xl font-semibold text-green-700">{completed}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Clock className="text-blue-600" />
          <div>
            <p className="text-sm text-blue-600">In Progress</p>
            <p className="text-xl font-semibold text-blue-700">{inProgress}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
          <AlertTriangle className="text-red-600" />
          <div>
            <p className="text-sm text-red-600">Urgent</p>
            <p className="text-xl font-semibold text-red-700">{urgent}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span>{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>
    </div>
  );
}
