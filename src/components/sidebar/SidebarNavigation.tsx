
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { mainMenuItems } from './MainMenu';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from 'lucide-react';

// Définir les sous-menus pour les sections principales
const subMenus = {
  analytics: [
    { name: 'Performance', path: '/analytics/performance' },
    { name: 'User Activity', path: '/analytics/user-activity' },
    { name: 'Growth', path: '/analytics/growth' },
  ],
  reports: [
    { name: 'Weekly Report', path: '/reports/weekly' },
    { name: 'Monthly Report', path: '/reports/monthly' },
    { name: 'Custom Reports', path: '/reports/custom' },
  ],
  settings: [
    { name: 'Profile', path: '/profile' },
    { name: 'Preferences', path: '/settings/preferences' },
    { name: 'Security', path: '/settings/security' },
    { name: 'Notifications', path: '/settings/notifications' },
  ],
  team: [
    { name: 'Members', path: '/team/members' },
    { name: 'Roles', path: '/team/roles' },
    { name: 'Invitations', path: '/team/invitations' },
  ],
};

// Liste des sections qui peuvent avoir des sous-menus
const expandableSections = ['analytics', 'reports', 'settings', 'team'];

export function SidebarNavigation() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>([]);
  
  // Groupe les items du menu
  const mainFeatures = mainMenuItems.slice(0, 4);
  const analyticsFeatures = mainMenuItems.slice(4, 7);
  const teamAndSettings = mainMenuItems.slice(7);

  // Vérifie si une section est ouverte
  const isSectionOpen = (sectionPath: string): boolean => {
    return openSections.includes(sectionPath);
  };

  // Bascule l'état ouvert/fermé d'une section
  const toggleSection = (sectionPath: string) => {
    setOpenSections(prev => 
      prev.includes(sectionPath)
        ? prev.filter(path => path !== sectionPath)
        : [...prev, sectionPath]
    );
  };

  // Vérifie si un chemin est actif (pour la route actuelle ou ses sous-routes)
  const isPathActive = (path: string): boolean => {
    // Gestion spéciale pour la route dashboard qui est exacte
    if (path === '/dashboard') return location.pathname === path;
    
    // Pour les autres routes, on vérifie si le chemin actuel commence par le path du menu
    return location.pathname.startsWith(path);
  };

  // Extrait le nom de la section à partir du chemin
  const getSectionNameFromPath = (path: string): string => {
    const pathWithoutSlash = path.startsWith('/') ? path.substring(1) : path;
    return pathWithoutSlash.split('/')[0];
  };

  // Détermine si une section doit être affichée comme ouverte par défaut
  // si la route actuelle est dans cette section
  React.useEffect(() => {
    const currentSection = getSectionNameFromPath(location.pathname);
    if (expandableSections.includes(currentSection) && !openSections.includes(`/${currentSection}`)) {
      setOpenSections(prev => [...prev, `/${currentSection}`]);
    }
  }, [location.pathname]);

  const renderMenuItem = (item: typeof mainMenuItems[0], hasSubmenu = false) => {
    const isActive = isPathActive(item.path);
    const sectionName = getSectionNameFromPath(item.path);
    const canExpand = hasSubmenu && expandableSections.includes(sectionName);
    const isOpen = isSectionOpen(item.path);
    
    if (canExpand) {
      return (
        <Collapsible
          key={item.path}
          open={isOpen}
          onOpenChange={() => toggleSection(item.path)}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={cn(
                "flex items-center justify-between gap-2 px-2 py-2 text-sm rounded-md transition-colors relative group w-full",
                isActive
                  ? "bg-primary/20 text-primary-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {isOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-6 space-y-1 mt-1">
            {subMenus[sectionName as keyof typeof subMenus]?.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors relative group",
                  location.pathname === subItem.path
                    ? "bg-primary/10 text-primary-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                <span>{subItem.name}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors relative group",
          isActive
            ? "bg-primary/20 text-primary-foreground font-medium"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        {item.icon}
        <span>{item.name}</span>
        {isActive && (
          <span className="absolute right-2 w-1 h-1 rounded-full bg-primary-foreground" />
        )}
      </Link>
    );
  };

  const renderMenuGroup = (items: typeof mainMenuItems, label: string) => (
    <div className="space-y-1">
      <div className="px-2 py-2">
        <h3 className="mb-2 px-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
          {label}
        </h3>
        {items.map((item) => {
          const sectionName = getSectionNameFromPath(item.path);
          const hasSubmenu = expandableSections.includes(sectionName);
          return renderMenuItem(item, hasSubmenu);
        })}
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
