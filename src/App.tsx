
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView";
import { ProjectProvider } from "./contexts/ProjectContext";
import { Sidebar } from "./components/Sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Dashboard />
                  </div>
                </div>
              } 
            />
            
            <Route 
              path="/projects/:projectId" 
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <ProjectView />
                  </div>
                </div>
              } 
            />
            
            {/* Redirect unrecognized paths to 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
