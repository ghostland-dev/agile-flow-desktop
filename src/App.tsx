
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { NotificationProvider } from "./contexts/NotificationContext";
import { useNotifications } from "./contexts/NotificationContext";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { NotificationBell } from "./components/ui/notification-bell";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView";
import MyTasks from "./pages/MyTasks";
import TimeTracking from "./pages/TimeTracking";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import { CalendarView } from "./components/CalendarView";
import { ProjectProvider } from "./contexts/ProjectProvider";
import { Sidebar } from "./components/Sidebar";
import { useEffect } from "react";

const queryClient = new QueryClient();

function AppHeader() {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  
  return (
    <div className="h-14 border-b border-border/60 flex items-center justify-end px-4 gap-2 bg-background">
      <NotificationBell 
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onClear={clearNotification}
      />
      <ThemeToggle />
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        {children}
      </div>
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <NotificationProvider>
            <ProjectProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected routes with sidebar */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <AppLayout>
                        <Dashboard />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/my-tasks" 
                    element={
                      <AppLayout>
                        <MyTasks />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/calendar" 
                    element={
                      <AppLayout>
                        <CalendarView />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/time-tracking" 
                    element={
                      <AppLayout>
                        <TimeTracking />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/team" 
                    element={
                      <AppLayout>
                        <Team />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/stats" 
                    element={
                      <AppLayout>
                        <Stats />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/settings" 
                    element={
                      <AppLayout>
                        <Settings />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/projects/:projectId" 
                    element={
                      <AppLayout>
                        <ProjectView />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Redirect unrecognized paths to 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ProjectProvider>
          </NotificationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
