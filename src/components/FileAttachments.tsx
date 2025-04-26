
import React from 'react';
import { FileCode, FileImage } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { Button } from '@/components/ui/button';

interface FileAttachmentsProps {
  taskId: string;
}

export function FileAttachments({ taskId }: FileAttachmentsProps) {
  const { getTaskAttachments } = useProject();
  const files = getTaskAttachments(taskId);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {files.map(file => (
        <Button
          key={file.id}
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          asChild
        >
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.type === 'image' ? (
              <FileImage size={12} />
            ) : (
              <FileCode size={12} />
            )}
            {file.name}
          </a>
        </Button>
      ))}
    </div>
  );
}
