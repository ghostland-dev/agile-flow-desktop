
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface ProjectListProps {
  projects: Project[];
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function ProjectList({ 
  projects, 
  onNewProject, 
  onEditProject, 
  onDeleteProject 
}: ProjectListProps) {
  const location = useLocation();

  return (
    <div className="mt-8 px-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium uppercase text-sidebar-foreground/60">Projects</h3>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-5 w-5 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={onNewProject}
        >
          <Plus size={16} />
        </Button>
      </div>
      <nav className="space-y-1">
        {projects.map((project) => (
          <ContextMenu key={project.id}>
            <ContextMenuTrigger>
              <Link
                to={`/projects/${project.id}`}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors",
                  location.pathname.includes(`/projects/${project.id}`)
                    ? "bg-primary/20 text-primary-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                {project.name}
              </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => onEditProject(project)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </ContextMenuItem>
              <ContextMenuItem 
                className="text-destructive"
                onClick={() => onDeleteProject(project)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </nav>
    </div>
  );
}
