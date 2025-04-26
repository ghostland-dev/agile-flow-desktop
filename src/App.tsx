
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
import Profile from "./pages/Profile";
import { CalendarView } from "./components/CalendarView";
import { ProjectProvider } from "./contexts/ProjectProvider";
import { Sidebar } from "./components/Sidebar";
import { Suspense, lazy } from "react";
import { LoadingSkeleton } from "./components/ui/loading-skeleton";
import { ScrollArea } from "./components/ui/scroll-area";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import Billing from "./pages/Billing";
import Help from "./pages/Help";

// Import des nouvelles pages
import Performance from "./pages/analytics/Performance";
import UserActivity from "./pages/analytics/UserActivity";

// Lazy loading pour les pages supplémentaires
const Growth = lazy(() => import('./pages/analytics/Growth'));
const WeeklyReport = lazy(() => import('./pages/reports/WeeklyReport'));
const MonthlyReport = lazy(() => import('./pages/reports/MonthlyReport'));
const CustomReports = lazy(() => import('./pages/reports/CustomReports'));
const Preferences = lazy(() => import('./pages/settings/Preferences'));
const Security = lazy(() => import('./pages/settings/Security'));
const Notifications = lazy(() => import('./pages/settings/Notifications'));
const TeamMembers = lazy(() => import('./pages/team/Members'));
const TeamRoles = lazy(() => import('./pages/team/Roles'));
const TeamInvitations = lazy(() => import('./pages/team/Invitations'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppHeader() {
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

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <Suspense fallback={<div className="p-6"><LoadingSkeleton /></div>}>
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </Suspense>
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
                  
                  {/* Tasks routes */}
                  <Route 
                    path="/my-tasks" 
                    element={
                      <AppLayout>
                        <MyTasks />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Calendar route */}
                  <Route 
                    path="/calendar" 
                    element={
                      <AppLayout>
                        <CalendarView />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Time tracking route */}
                  <Route 
                    path="/time-tracking" 
                    element={
                      <AppLayout>
                        <TimeTracking />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Team routes */}
                  <Route 
                    path="/team" 
                    element={
                      <AppLayout>
                        <Team />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/team/members" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <TeamMembers />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/team/roles" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <TeamRoles />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/team/invitations" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <TeamInvitations />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  {/* Stats route */}
                  <Route 
                    path="/stats" 
                    element={
                      <AppLayout>
                        <Stats />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Analytics routes */}
                  <Route 
                    path="/analytics" 
                    element={
                      <AppLayout>
                        <Analytics />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/analytics/performance" 
                    element={
                      <AppLayout>
                        <Performance />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/analytics/user-activity" 
                    element={
                      <AppLayout>
                        <UserActivity />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/analytics/growth" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <Growth />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  {/* Reports routes */}
                  <Route 
                    path="/reports" 
                    element={
                      <AppLayout>
                        <Reports />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/reports/weekly" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <WeeklyReport />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/reports/monthly" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <MonthlyReport />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/reports/custom" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <CustomReports />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  {/* Integrations route */}
                  <Route 
                    path="/integrations" 
                    element={
                      <AppLayout>
                        <Integrations />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Billing route */}
                  <Route 
                    path="/billing" 
                    element={
                      <AppLayout>
                        <Billing />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Settings routes */}
                  <Route 
                    path="/settings" 
                    element={
                      <AppLayout>
                        <Settings />
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/settings/preferences" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <Preferences />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/settings/security" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <Security />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  <Route 
                    path="/settings/notifications" 
                    element={
                      <AppLayout>
                        <Suspense fallback={<LoadingSkeleton />}>
                          <Notifications />
                        </Suspense>
                      </AppLayout>
                    } 
                  />
                  
                  {/* Help route */}
                  <Route 
                    path="/help" 
                    element={
                      <AppLayout>
                        <Help />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Profile route */}
                  <Route 
                    path="/profile" 
                    element={
                      <AppLayout>
                        <Profile />
                      </AppLayout>
                    } 
                  />
                  
                  {/* Project view route */}
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
