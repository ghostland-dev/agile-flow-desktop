
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
      <div className="flex items-center justify-between mb-6">
        <ProjectInfo />
        
        <div className="flex items-center gap-3">
          <ProjectTeamPreview />
          <TimeTracker />
          <NewTaskForm />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <ViewNav />
        <SearchAndFilter />
      </div>
    </header>
  );
}
