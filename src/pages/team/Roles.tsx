
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RoleForm } from '@/components/team/RoleForm';
import { DeleteRoleDialog } from '@/components/team/DeleteRoleDialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';

// État initial des rôles (simulation)
const initialRoles = [
  { 
    id: 1, 
    name: 'Admin', 
    description: 'Full access to all settings and features',
    permissions: ['create_project', 'delete_project', 'manage_users', 'manage_roles', 'billing', 'all_tasks'],
    users: 2
  },
  { 
    id: 2, 
    name: 'Project Manager', 
    description: 'Can manage projects and team members',
    permissions: ['create_project', 'manage_users', 'all_tasks'],
    users: 3
  },
  { 
    id: 3, 
    name: 'Developer', 
    description: 'Access to assigned projects and tasks',
    permissions: ['view_project', 'edit_own_tasks', 'create_tasks'],
    users: 8
  },
  { 
    id: 4, 
    name: 'Designer', 
    description: 'Access to assigned projects and design tasks',
    permissions: ['view_project', 'edit_own_tasks', 'create_tasks'],
    users: 4
  },
  { 
    id: 5, 
    name: 'Viewer', 
    description: 'View-only access to assigned projects',
    permissions: ['view_project'],
    users: 5
  }
];

export default function TeamRoles() {
  const [roles, setRoles] = useState(initialRoles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<typeof initialRoles[0] | null>(null);
  const [deleteRole, setDeleteRole] = useState<typeof initialRoles[0] | null>(null);

  const handleCreateRole = (data: any) => {
    const newRole = {
      id: Math.max(...roles.map(r => r.id)) + 1,
      ...data,
      users: 0,
    };
    setRoles([...roles, newRole]);
    setIsFormOpen(false);
    toast.success('Role created successfully');
  };

  const handleUpdateRole = (data: any) => {
    if (!editingRole) return;
    const updatedRoles = roles.map(role => 
      role.id === editingRole.id ? { ...role, ...data } : role
    );
    setRoles(updatedRoles);
    setEditingRole(null);
    toast.success('Role updated successfully');
  };

  const handleDeleteRole = () => {
    if (!deleteRole) return;
    const filtered = roles.filter(role => role.id !== deleteRole.id);
    setRoles(filtered);
    setDeleteRole(null);
    toast.success('Role deleted successfully');
  };

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Team Roles & Permissions</h1>
            <p className="text-muted-foreground">
              Manage roles and their associated permissions
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Role
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Define access levels for team members</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map(role => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map(perm => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                        {role.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{role.users}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingRole(role)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteRole(role)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
          </DialogHeader>
          <RoleForm
            onSubmit={handleCreateRole}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          {editingRole && (
            <RoleForm
              initialData={editingRole}
              onSubmit={handleUpdateRole}
              onCancel={() => setEditingRole(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {deleteRole && (
        <DeleteRoleDialog
          open={!!deleteRole}
          onOpenChange={(open) => !open && setDeleteRole(null)}
          onConfirm={handleDeleteRole}
          roleName={deleteRole.name}
        />
      )}
    </ScrollArea>
  );
}
