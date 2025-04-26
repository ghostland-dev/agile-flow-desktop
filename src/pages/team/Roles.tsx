
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Données fictives pour les rôles d'équipe
const roles = [
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
          <Button onClick={() => toast.info('Create role dialog will open here')}>Create New Role</Button>
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
                  <TableHead className="w-[100px]"></TableHead>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toast.info(`Edit ${role.name} role`)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Detailed permissions breakdown by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed permissions matrix will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
