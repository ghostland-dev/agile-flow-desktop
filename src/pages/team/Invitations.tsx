
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { InviteMemberDialog } from '@/components/team/InviteMemberDialog';

// Types for our invitation data
interface TeamInvitation {
  id: number;
  email: string;
  role: string;
  status: 'pending' | 'expired';
  invited: string;
}

// Initial mock data
const initialInvitations: TeamInvitation[] = [
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
  const [invitations, setInvitations] = useState<TeamInvitation[]>(initialInvitations);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const handleResendInvitation = (invitation: TeamInvitation) => {
    // In a real app, this would make an API call to resend the invitation
    const updatedInvitations = invitations.map(inv => {
      if (inv.id === invitation.id) {
        return {
          ...inv,
          status: 'pending' as const,
          invited: new Date().toISOString()
        };
      }
      return inv;
    });
    setInvitations(updatedInvitations);
    toast.success(`Invitation resent to ${invitation.email}`);
  };

  const handleRevokeInvitation = (invitation: TeamInvitation) => {
    // In a real app, this would make an API call to revoke the invitation
    setInvitations(invitations.filter(inv => inv.id !== invitation.id));
    toast.success(`Invitation to ${invitation.email} revoked`);
  };

  const handleCreateInvitation = (data: { email: string; role: string }) => {
    const newInvitation: TeamInvitation = {
      id: Math.max(...invitations.map(inv => inv.id)) + 1,
      email: data.email,
      role: data.role,
      status: 'pending',
      invited: new Date().toISOString()
    };
    setInvitations([newInvitation, ...invitations]);
    toast.success(`Invitation sent to ${data.email}`);
  };

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
          <Button onClick={() => setIsInviteDialogOpen(true)}>Send New Invitation</Button>
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
                        {invite.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleResendInvitation(invite)}
                            >
                              Resend
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRevokeInvitation(invite)}
                              className="text-destructive"
                            >
                              Revoke
                            </Button>
                          </>
                        )}
                        {invite.status === 'expired' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleResendInvitation(invite)}
                          >
                            Resend
                          </Button>
                        )}
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
      </div>

      <InviteMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onSubmit={handleCreateInvitation}
      />
    </ScrollArea>
  );
}
