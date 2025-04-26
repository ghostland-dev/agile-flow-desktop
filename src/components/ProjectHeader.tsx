
import React from 'react';
import { NewTaskForm } from './NewTaskForm';
import { ProjectInfo } from './project-header/ProjectInfo';
import { ProjectTeamPreview } from './project-header/ProjectTeamPreview';
import { TimeTracker } from './project-header/TimeTracker';
import { ViewNav } from './project-header/ViewNav';
import { SearchAndFilter } from './project-header/SearchAndFilter';

export function ProjectHeader() {
  return (
    <header className="border-b bg-background dark:bg-background px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <ProjectInfo />
        
        <div className="flex flex-wrap items-center gap-3">
          <ProjectTeamPreview />
          <TimeTracker />
          <NewTaskForm />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ViewNav />
        <SearchAndFilter />
      </div>
    </header>
  );
}
