import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditProjectForm } from './EditProjectForm';
import { useProject } from '@/hooks/useProject';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const { deleteProject } = useProject();
  
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const handleDelete = () => {
    deleteProject(project.id);
    setDeleteDialogOpen(false);
  };
  
  return (
    <>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <EditProjectForm 
            project={project} 
            onSuccess={() => setEditDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone
              and all associated tasks will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
