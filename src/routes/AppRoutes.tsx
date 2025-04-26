import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import MyTasks from "@/pages/MyTasks";
import { CalendarView } from "@/components/CalendarView";
import TimeTracking from "@/pages/TimeTracking";
import Team from "@/pages/Team";
import Stats from "@/pages/Stats";
import Analytics from "@/pages/Analytics";
import Reports from "@/pages/Reports";
import Integrations from "@/pages/Integrations";
import Billing from "@/pages/Billing";
import Help from "@/pages/Help";
import Performance from "@/pages/analytics/Performance";
import UserActivity from "@/pages/analytics/UserActivity";
import ProjectView from "@/pages/ProjectView";
import SaasOverview from "@/pages/SaasOverview";

// Lazy loaded components
const Growth = lazy(() => import('@/pages/analytics/Growth'));
const WeeklyReport = lazy(() => import('@/pages/reports/WeeklyReport'));
const MonthlyReport = lazy(() => import('@/pages/reports/MonthlyReport'));
const CustomReports = lazy(() => import('@/pages/reports/CustomReports'));
const Preferences = lazy(() => import('@/pages/settings/Preferences'));
const Security = lazy(() => import('@/pages/settings/Security'));
const Notifications = lazy(() => import('@/pages/settings/Notifications'));
const TeamMembers = lazy(() => import('@/pages/team/Members'));
const TeamRoles = lazy(() => import('@/pages/team/Roles'));
const TeamInvitations = lazy(() => import('@/pages/team/Invitations'));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes with layout */}
      <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/my-tasks" element={<AppLayout><MyTasks /></AppLayout>} />
      <Route path="/calendar" element={<AppLayout><CalendarView /></AppLayout>} />
      <Route path="/time-tracking" element={<AppLayout><TimeTracking /></AppLayout>} />
      <Route path="/team" element={<AppLayout><Team /></AppLayout>} />
      <Route path="/stats" element={<AppLayout><Stats /></AppLayout>} />
      
      {/* Analytics routes */}
      <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
      <Route path="/analytics/performance" element={<AppLayout><Performance /></AppLayout>} />
      <Route path="/analytics/user-activity" element={<AppLayout><UserActivity /></AppLayout>} />
      <Route path="/analytics/growth" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><Growth /></Suspense>
      </AppLayout>} />
      
      {/* Reports routes */}
      <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
      <Route path="/reports/weekly" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><WeeklyReport /></Suspense>
      </AppLayout>} />
      <Route path="/reports/monthly" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><MonthlyReport /></Suspense>
      </AppLayout>} />
      <Route path="/reports/custom" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><CustomReports /></Suspense>
      </AppLayout>} />
      
      {/* Team routes */}
      <Route path="/team/members" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><TeamMembers /></Suspense>
      </AppLayout>} />
      <Route path="/team/roles" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><TeamRoles /></Suspense>
      </AppLayout>} />
      <Route path="/team/invitations" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><TeamInvitations /></Suspense>
      </AppLayout>} />
      
      {/* Settings routes */}
      <Route path="/settings/preferences" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><Preferences /></Suspense>
      </AppLayout>} />
      <Route path="/settings/security" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><Security /></Suspense>
      </AppLayout>} />
      <Route path="/settings/notifications" element={<AppLayout>
        <Suspense fallback={<LoadingSkeleton />}><Notifications /></Suspense>
      </AppLayout>} />
      
      {/* Other routes */}
      <Route path="/integrations" element={<AppLayout><Integrations /></AppLayout>} />
      <Route path="/billing" element={<AppLayout><Billing /></AppLayout>} />
      <Route path="/help" element={<AppLayout><Help /></AppLayout>} />
      <Route path="/projects/:projectId" element={<AppLayout><ProjectView /></AppLayout>} />
      
      {/* SaaS Overview route */}
      <Route path="/saas" element={<AppLayout><SaasOverview /></AppLayout>} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
