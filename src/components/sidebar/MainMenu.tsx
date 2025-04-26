import React from 'react';
import { 
  Home, 
  CheckCircle, 
  Calendar, 
  Clock, 
  BarChart, 
  Users,
  Settings,
  ChartBar,
  FileText,
  Share,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const mainMenuItems = [
  // Main features
  { name: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
  { name: 'My Tasks', path: '/my-tasks', icon: <CheckCircle size={18} /> },
  { name: 'Calendar', path: '/calendar', icon: <Calendar size={18} /> },
  { name: 'Time Tracking', path: '/time-tracking', icon: <Clock size={18} /> },
  
  // Analytics & Reports
  { name: 'Stats', path: '/stats', icon: <BarChart size={18} /> },
  { name: 'Analytics', path: '/analytics', icon: <ChartBar size={18} /> },
  { name: 'Reports', path: '/reports', icon: <FileText size={18} /> },
  { name: 'SaaS Overview', path: '/saas', icon: <ChartBar size={18} /> },
  
  // Team & Settings
  { name: 'Team', path: '/team', icon: <Users size={18} /> },
  { name: 'Integrations', path: '/integrations', icon: <Share size={18} /> },
  { name: 'Billing', path: '/billing', icon: <CreditCard size={18} /> },
  { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
  { name: 'Help', path: '/help', icon: <HelpCircle size={18} /> },
];

export function MainMenu() {
  return null; // This component is now deprecated in favor of SidebarNavigation
}
