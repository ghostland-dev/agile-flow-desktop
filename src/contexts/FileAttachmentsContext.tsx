
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FileAttachment } from '../types/project';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

interface FileAttachmentContextType {
  fileAttachments: FileAttachment[];
  getTaskAttachments: (taskId: string) => FileAttachment[];
  addFileAttachment: (taskId: string, file: Omit<FileAttachment, 'id' | 'taskId' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteFileAttachment: (fileId: string) => void;
}

const FileAttachmentContext = createContext<FileAttachmentContextType | undefined>(undefined);

export const useFileAttachments = () => {
  const context = useContext(FileAttachmentContext);
  if (!context) throw new Error('useFileAttachments must be used within a FileAttachmentProvider');
  return context;
};

export function FileAttachmentProvider({ children }: { children: React.ReactNode }) {
  const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>(() => 
    loadFromStorage('fileAttachments', [])
  );

  useEffect(() => {
    saveToStorage('fileAttachments', fileAttachments);
  }, [fileAttachments]);

  const getTaskAttachments = (taskId: string) => {
    return fileAttachments.filter(file => file.taskId === taskId);
  };

  const addFileAttachment = (taskId: string, file: Omit<FileAttachment, 'id' | 'taskId' | 'uploadedAt' | 'uploadedBy'>) => {
    const newAttachment: FileAttachment = {
      ...file,
      id: uuidv4(),
      taskId,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'current-user', // In a real app, get this from the current user
    };
    setFileAttachments(prev => [...prev, newAttachment]);
  };

  const deleteFileAttachment = (fileId: string) => {
    setFileAttachments(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <FileAttachmentContext.Provider value={{
      fileAttachments,
      getTaskAttachments,
      addFileAttachment,
      deleteFileAttachment,
    }}>
      {children}
    </FileAttachmentContext.Provider>
  );
}
