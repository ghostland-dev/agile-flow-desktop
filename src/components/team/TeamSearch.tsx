
import React from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface TeamSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onInviteClick: () => void;
}

export function TeamSearch({ searchQuery, onSearchChange, onInviteClick }: TeamSearchProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-64 pl-9 pr-4 py-2 rounded-md"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>All Roles</DropdownMenuItem>
            <DropdownMenuItem>Project Manager</DropdownMenuItem>
            <DropdownMenuItem>Developer</DropdownMenuItem>
            <DropdownMenuItem>Designer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by activity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Active this week</DropdownMenuItem>
            <DropdownMenuItem>Active this month</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button onClick={onInviteClick} className="flex items-center gap-1 w-full md:w-auto">
          <UserPlus size={16} />
          <span>Invite</span>
        </Button>
      </div>
    </div>
  );
}
