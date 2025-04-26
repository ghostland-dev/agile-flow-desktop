
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProject } from '@/hooks/useProject';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberDialog({ open, onOpenChange }: AddMemberDialogProps) {
  const { users, currentProject, addProjectMember } = useProject();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = (userId: string) => {
    if (!currentProject) return;
    
    addProjectMember(userId, currentProject.id);
    toast({
      title: "Member added",
      description: "The team member has been added to the project successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAddMember(user.id)}
              >
                Add
              </Button>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              No members found matching your search.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
