
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { mainMenuItems } from './MainMenu';

export function SidebarNavigation() {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-3 mt-4">
      {mainMenuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors",
            location.pathname === item.path
              ? "bg-primary/20 text-primary-foreground font-medium"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
