
import React from 'react';
import { Search } from 'lucide-react';

export function SidebarSearch() {
  return (
    <div className="px-3 mb-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 pl-8 pr-3 bg-sidebar-accent text-sidebar-foreground rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
}
