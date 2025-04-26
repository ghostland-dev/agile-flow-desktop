
import React from 'react';
import { FileText } from 'lucide-react';

export function SidebarHeader() {
  return (
    <div className="flex items-center px-3 mb-8">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <FileText size={20} className="text-white" />
        </div>
        <h1 className="font-bold text-xl text-white">ProjectFlow</h1>
      </div>
    </div>
  );
}
