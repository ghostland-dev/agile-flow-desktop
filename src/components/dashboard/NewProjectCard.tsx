
import React from 'react';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewProjectForm } from './NewProjectForm';

export function NewProjectCard() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card 
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center p-6 border-dashed border-border/60 hover:bg-accent/50 transition-colors cursor-pointer group"
      >
        <div className="rounded-full bg-muted p-3 group-hover:bg-primary/20 transition-colors">
          <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <h3 className="mt-4 font-medium">Create New Project</h3>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Start tracking tasks in a new project
        </p>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <NewProjectForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
