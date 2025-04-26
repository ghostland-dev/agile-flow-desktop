
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileCode, FileImage, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProject } from '../contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  taskId: string;
  onUpload?: () => void;
}

export function FileUploader({ taskId, onUpload }: FileUploaderProps) {
  const { addFileAttachment } = useProject();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      // In a real app, you would upload to a storage service here
      // For now, we'll create a local URL
      const fileUrl = URL.createObjectURL(file);
      
      // Determine file type
      const fileType = file.type.startsWith('image/') 
        ? 'image' 
        : file.type.includes('pdf') || file.type.includes('document')
        ? 'document'
        : 'other';
      
      addFileAttachment(taskId, {
        name: file.name,
        url: fileUrl,
        type: fileType,
      });
      
      toast({
        title: "File uploaded",
        description: `${file.name} has been attached to the task`,
      });
    });
    
    onUpload?.();
  }, [taskId, addFileAttachment, onUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-muted hover:border-primary"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Upload size={20} />
        {isDragActive ? (
          <p className="text-sm">Drop files here</p>
        ) : (
          <p className="text-sm">Drag files here or click to select</p>
        )}
      </div>
    </div>
  );
}
