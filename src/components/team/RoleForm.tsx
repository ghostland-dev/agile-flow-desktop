
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const permissionsList = [
  { id: 'create_project', label: 'Create Project' },
  { id: 'delete_project', label: 'Delete Project' },
  { id: 'manage_users', label: 'Manage Users' },
  { id: 'manage_roles', label: 'Manage Roles' },
  { id: 'billing', label: 'Billing' },
  { id: 'all_tasks', label: 'All Tasks' },
  { id: 'view_project', label: 'View Project' },
  { id: 'edit_own_tasks', label: 'Edit Own Tasks' },
  { id: 'create_tasks', label: 'Create Tasks' },
];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  permissions: z.array(z.string()).min(1, 'Select at least one permission'),
});

interface RoleFormProps {
  initialData?: {
    id?: number;
    name: string;
    description: string;
    permissions: string[];
  };
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export function RoleForm({ initialData, onSubmit, onCancel }: RoleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      permissions: initialData?.permissions || [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter role name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter role description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Permissions</FormLabel>
                <FormDescription>
                  Select the permissions for this role
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {permissionsList.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(permission.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, permission.id]);
                              } else {
                                field.onChange(
                                  field.value?.filter((value) => value !== permission.id)
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {permission.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Role' : 'Create Role'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
