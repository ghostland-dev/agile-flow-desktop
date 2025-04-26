
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, Calendar, Clock, BarChart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export const mainMenuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
  { name: 'My Tasks', path: '/my-tasks', icon: <CheckCircle size={18} /> },
  { name: 'Calendar', path: '/calendar', icon: <Calendar size={18} /> },
  { name: 'Time Tracking', path: '/time-tracking', icon: <Clock size={18} /> },
  { name: 'Stats', path: '/stats', icon: <BarChart size={18} /> },
  { name: 'Team', path: '/team', icon: <Users size={18} /> },
];

export function MainMenu() {
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
