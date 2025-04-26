
import { useNotifications } from "@/contexts/NotificationContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NotificationBell } from "@/components/ui/notification-bell";

export function AppHeader() {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  
  return (
    <header className="h-14 border-b border-border/60 flex items-center justify-end px-4 gap-2 bg-background sticky top-0 z-10">
      <NotificationBell 
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onClear={clearNotification}
      />
      <ThemeToggle />
    </header>
  );
}
