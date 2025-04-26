import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  Home, 
  Plus,
  Search, 
  Settings,
  BarChart,
  Users,
  Pencil,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewProjectForm } from './dashboard/NewProjectForm';
import { EditProjectForm } from './dashboard/EditProjectForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Project } from '@/types/project';

export function Sidebar() {
  const location = useLocation();
  const { projects, deleteProject } = useProject();
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const mainMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
    { name: 'My Tasks', path: '/my-tasks', icon: <CheckCircle size={18} /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={18} /> },
    { name: 'Time Tracking', path: '/time-tracking', icon: <Clock size={18} /> },
    { name: 'Stats', path: '/stats', icon: <BarChart size={18} /> },
    { name: 'Team', path: '/team', icon: <Users size={18} /> },
  ];

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setEditProjectDialogOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-60 bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
      <div className="px-3 py-4">
        <div className="flex items-center px-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-xl text-white">ProjectFlow</h1>
          </div>
        </div>
        
        <div className="px-3 mb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full py-2 pl-8 pr-3 bg-sidebar-accent text-sidebar-foreground rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <nav className="space-y-1 px-3 mt-4">
          {mainMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-primary/20 text-primary-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 px-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium uppercase text-sidebar-foreground/60">Projects</h3>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setNewProjectDialogOpen(true)}
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
                  <ContextMenuItem onClick={() => handleEditProject(project)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </ContextMenuItem>
                  <ContextMenuItem 
                    className="text-destructive"
                    onClick={() => handleDeleteProject(project)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="mt-auto px-3 py-4 border-t border-sidebar-border">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors",
            location.pathname === "/settings"
              ? "bg-primary/20 text-primary-foreground font-medium" 
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          )}
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>

      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <NewProjectForm onSuccess={() => setNewProjectDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={editProjectDialogOpen} onOpenChange={setEditProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <EditProjectForm 
              project={selectedProject} 
              onSuccess={() => setEditProjectDialogOpen(false)} 
            />
          )}
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
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
