
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
  completedCount: number;
  totalCount: number;
}

export function ProjectCard({ project, completedCount, totalCount }: ProjectCardProps) {
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  return (
    <Card className="hover:shadow-md transition-shadow border border-border/60 group">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: project.color }} 
            />
            <CardTitle>{project.name}</CardTitle>
          </div>
        </div>
        <CardDescription className="mt-1 line-clamp-2" title={project.description}>
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress</span>
            <span className={progress === 100 ? "text-green-600 font-medium" : ""}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`rounded-full h-2 transition-all ${progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <CheckCircle size={14} />
              <span>{completedCount}/{totalCount}</span>
            </div>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Project
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
