
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { mainMenuItems } from './MainMenu';
import { Separator } from '@/components/ui/separator';

export function SidebarNavigation() {
  const location = useLocation();
  
  // Group the menu items
  const mainFeatures = mainMenuItems.slice(0, 4);
  const analyticsFeatures = mainMenuItems.slice(4, 7);
  const teamAndSettings = mainMenuItems.slice(7);

  const renderMenuGroup = (items: typeof mainMenuItems, label: string) => (
    <div className="space-y-1">
      <div className="px-2 py-2">
        <h3 className="mb-2 px-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
          {label}
        </h3>
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors relative group",
              location.pathname === item.path
                ? "bg-primary/20 text-primary-foreground font-medium"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            {item.icon}
            <span>{item.name}</span>
            {location.pathname === item.path && (
              <span className="absolute right-2 w-1 h-1 rounded-full bg-primary-foreground" />
            )}
          </Link>
        ))}
      </div>
      <Separator className="mx-2 bg-sidebar-accent/50" />
    </div>
  );

  return (
    <nav className="space-y-1 px-3 mt-4">
      {renderMenuGroup(mainFeatures, 'Main')}
      {renderMenuGroup(analyticsFeatures, 'Analytics')}
      {renderMenuGroup(teamAndSettings, 'Settings & Support')}
    </nav>
  );
}
