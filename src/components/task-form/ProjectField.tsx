
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskFormState } from '@/hooks/useTaskForm';
import { Label } from '@/components/ui/label';
import { useProject } from '@/hooks/useProject';

interface ProjectFieldProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function ProjectField({ formState, setFormState }: ProjectFieldProps) {
  const { projects } = useProject();

  const handleProjectChange = React.useCallback((value: string) => {
    setFormState(prevState => ({ ...prevState, projectId: value }));
  }, [setFormState]);

  return (
    <div className="space-y-2">
      <Label htmlFor="project">Project</Label>
      <Select
        value={formState.projectId}
        onValueChange={handleProjectChange}
      >
        <SelectTrigger id="project">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
