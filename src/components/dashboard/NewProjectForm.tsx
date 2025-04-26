
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProject } from '@/hooks/useProject';

interface NewProjectFormData {
  name: string;
  description: string;
  color: string;
}

interface NewProjectFormProps {
  onSuccess: () => void;
}

const PRESET_COLORS = [
  '#9b87f5', '#D946EF', '#F97316', '#0EA5E9',
  '#8B5CF6', '#E5DEFF', '#D3E4FD', '#FDE1D3'
];

export function NewProjectForm({ onSuccess }: NewProjectFormProps) {
  const { addProject } = useProject();
  const [selectedColor, setSelectedColor] = React.useState(PRESET_COLORS[0]);
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<NewProjectFormData>({
    defaultValues: {
      name: '',
      description: '',
      color: PRESET_COLORS[0]
    }
  });

  const onSubmit = async (data: NewProjectFormData) => {
    addProject({
      ...data,
      color: selectedColor,
      createdAt: new Date().toISOString()
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name', { required: true })}
          placeholder="Project name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Project description"
          className="resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
