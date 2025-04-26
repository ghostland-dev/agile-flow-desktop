
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex items-center gap-2">
      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="pl-9 w-60 h-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter size={14} />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>Recently updated</DropdownMenuItem>
          <DropdownMenuItem>Priority: High to Low</DropdownMenuItem>
          <DropdownMenuItem>Priority: Low to High</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Due date: Closest first</DropdownMenuItem>
          <DropdownMenuItem>Alphabetical: A to Z</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
