
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TaskTagsProps {
  tags: string[];
}

export function TaskTags({ tags }: TaskTagsProps) {
  if (!tags.length) return null;
  
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
