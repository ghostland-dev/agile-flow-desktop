
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Plus, User } from 'lucide-react';
import { useProject, Priority, Status } from '../contexts/ProjectContext';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NewTaskFormProps {
  initialStatus?: Status;
  openInDialog?: boolean;
}

export function NewTaskForm({ initialStatus = 'todo', openInDialog = true }: NewTaskFormProps) {
  const { currentProject, addTask } = useProject();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<Status>(initialStatus);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [assignee, setAssignee] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !currentProject) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez fournir un titre pour la tâche",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addTask({
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
        assignee,
        project: currentProject.id,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        timeTracked: 0,
      });
      
      toast({
        title: "Tâche créée",
        description: "Votre tâche a été créée avec succès",
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus(initialStatus);
      setDueDate(undefined);
      setAssignee(undefined);
      setTags('');
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création de la tâche. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Échec de la création de la tâche:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const TaskFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="space-y-2">
        <Input 
          placeholder="Titre de la tâche" 
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="text-base"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Statut</label>
          <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="todo">À faire</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="in_review">En révision</SelectItem>
              <SelectItem value="done">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Priorité</label>
          <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Basse</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Haute</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date d'échéance</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Assigné à</label>
          <Select value={assignee || "unassigned"} onValueChange={setAssignee}>
            <SelectTrigger>
              <SelectValue placeholder="Non assigné" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Non assigné</SelectItem>
              <SelectItem value="user-1">Alex Johnson</SelectItem>
              <SelectItem value="user-2">Sam Chen</SelectItem>
              <SelectItem value="user-3">Taylor Williams</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Tags (séparés par des virgules)</label>
        <Input 
          placeholder="design, frontend, urgent" 
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        {openInDialog && (
          <Button variant="outline" type="button" onClick={() => setOpen(false)}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Création..." : "Créer la tâche"}
        </Button>
      </div>
    </form>
  );
  
  if (!openInDialog) {
    return <TaskFormContent />;
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Ajouter une tâche
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
        </DialogHeader>
        <TaskFormContent />
      </DialogContent>
    </Dialog>
  );
}
