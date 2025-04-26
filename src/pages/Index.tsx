
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarCheck, CheckCircle, Clock, FileText, Layers } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-10 px-6 py-4 border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
              <FileText size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-xl">ProjectFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/login')}>Sign up for free</Button>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Modern project management for <span className="text-primary">agile teams</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline your workflow, track tasks, manage projects, and collaborate with your team in a single unified platform.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/login')}>
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
              View Demo
            </Button>
          </div>
          
          <div className="mt-16 bg-gray-100 border rounded-xl p-2 shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="ProjectFlow dashboard" 
              className="w-full rounded-lg border shadow-sm"
            />
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage projects effectively
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Layers className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Project Views</h3>
              <p className="text-gray-600">
                Switch between Kanban, list, calendar, and timeline views to visualize your projects however you prefer.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Task Management</h3>
              <p className="text-gray-600">
                Create, assign, and track tasks with priorities, deadlines, tags, and detailed descriptions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Time Tracking</h3>
              <p className="text-gray-600">
                Track time spent on tasks with built-in timers and generate detailed reports for analysis.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CalendarCheck className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Collaboration</h3>
              <p className="text-gray-600">
                Work together with your team using comments, @mentions, file sharing, and real-time notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="bg-primary/10 rounded-xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
            <p className="text-xl text-gray-600 mb-6">
              Start managing your projects with ProjectFlow today and see the difference.
            </p>
            <Button size="lg" onClick={() => navigate('/login')}>
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
              <FileText size={20} className="text-white" />
            </div>
            <h2 className="font-bold text-xl">ProjectFlow</h2>
          </div>
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} ProjectFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
