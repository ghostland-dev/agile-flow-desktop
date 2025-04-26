
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Données fictives pour les invitations
const invitations = [
  { 
    id: 1, 
    email: 'david.smith@example.com', 
    role: 'Developer',
    status: 'pending',
    invited: '2025-04-25T10:30:00Z'
  },
  { 
    id: 2, 
    email: 'rachel.taylor@example.com', 
    role: 'Designer',
    status: 'pending',
    invited: '2025-04-23T15:45:00Z'
  },
  { 
    id: 3, 
    email: 'thomas.lee@example.com', 
    role: 'Project Manager',
    status: 'expired',
    invited: '2025-03-15T09:20:00Z'
  },
];

export default function TeamInvitations() {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Team Invitations</h1>
            <p className="text-muted-foreground">
              Manage pending and expired invitations
            </p>
          </div>
          <Button onClick={() => toast.info('Send invitation dialog will open')}>Send New Invitation</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Team members who have been invited but haven't joined yet</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invited On</TableHead>
                  <TableHead className="w-[150px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map(invite => {
                  const inviteDate = new Date(invite.invited);
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }).format(inviteDate);
                  
                  return (
                    <TableRow key={invite.id}>
                      <TableCell>{invite.email}</TableCell>
                      <TableCell>{invite.role}</TableCell>
                      <TableCell>
                        <Badge variant={invite.status === 'pending' ? 'outline' : 'secondary'}>
                          {invite.status === 'pending' ? 'Pending' : 'Expired'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast.success(`Invitation to ${invite.email} resent`)}
                        >
                          Resend
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast.success(`Invitation to ${invite.email} revoked`)}
                          className="text-destructive"
                        >
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {invitations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No pending invitations
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invitation Settings</CardTitle>
            <CardDescription>Customize how invitations work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[100px] flex items-center justify-center">
              <p className="text-muted-foreground">Invitation settings will be displayed here</p>
            </div>
            <Button onClick={() => toast.success('Settings saved')}>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
