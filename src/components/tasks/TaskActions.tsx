
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { MoreHorizontal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskActionsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskActions({ onView, onEdit, onDelete }: TaskActionsProps) {
  return (
    <>
      <div className="hidden sm:flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onView}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View task</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View details</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onEdit}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit task</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit task</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete task</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="sm:hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View details
              </MenubarItem>
              <MenubarItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit task
              </MenubarItem>
              <MenubarItem onClick={onDelete} className="text-red-600 focus:text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete task
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
