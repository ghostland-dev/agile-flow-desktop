
import React from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TeamSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onInviteClick: () => void;
}

export function TeamSearch({ searchQuery, onSearchChange, onInviteClick }: TeamSearchProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-60 pl-9"
        />
      </div>
      <Button onClick={onInviteClick} className="flex items-center gap-2">
        <UserPlus size={16} />
        Invite Member
      </Button>
    </div>
  );
}
