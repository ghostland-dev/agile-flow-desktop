
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMemberDialog({ open, onOpenChange }: InviteMemberDialogProps) {
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState('team-member');

  const handleInviteSend = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invitation sent",
      description: `Invitation email has been sent to ${inviteEmail}`,
    });
    onOpenChange(false);
    setInviteEmail('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation email to a new team member.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleInviteSend} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              placeholder="colleague@example.com"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <select 
              id="role" 
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="team-member">Team Member</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="project-manager">Project Manager</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Personal Message (Optional)
            </label>
            <textarea 
              id="message" 
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-[100px]"
              placeholder="Add a personal message to the invitation email..."
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
