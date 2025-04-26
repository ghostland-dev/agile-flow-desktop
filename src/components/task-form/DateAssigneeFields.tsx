
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { TaskFormState } from '@/hooks/useTaskForm';

interface DateAssigneeFieldsProps {
  formState: TaskFormState;
  setFormState: React.Dispatch<React.SetStateAction<TaskFormState>>;
}

export function DateAssigneeFields({ formState, setFormState }: DateAssigneeFieldsProps) {
  const handleDateChange = React.useCallback((date: Date | undefined) => {
    setFormState((prevState) => ({ ...prevState, dueDate: date }));
  }, [setFormState]);

  const handleAssigneeChange = React.useCallback((value: string) => {
    setFormState((prevState) => ({ 
      ...prevState, 
      assignee: value === "unassigned" ? undefined : value 
    }));
  }, [setFormState]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Due date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formState.dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formState.dueDate ? format(formState.dueDate, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar 
              mode="single" 
              selected={formState.dueDate} 
              onSelect={handleDateChange}
              initialFocus 
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Assigned to</label>
        <Select 
          value={formState.assignee || "unassigned"}
          onValueChange={handleAssigneeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Unassigned" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="user-1">Alex Johnson</SelectItem>
            <SelectItem value="user-2">Sam Chen</SelectItem>
            <SelectItem value="user-3">Taylor Williams</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
