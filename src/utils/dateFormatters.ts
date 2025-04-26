
import { format, isToday, isYesterday, isTomorrow, isAfter } from 'date-fns';

export function formatTimeTracked(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatDueDate(dateString?: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isTomorrow(date)) return 'Tomorrow';
  
  return format(date, 'MMM d');
}

export function isDueSoon(dateString?: string): boolean {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  
  return isAfter(date, today) && !isAfter(date, threeDaysLater);
}

export function isPastDue(dateString?: string): boolean {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return isAfter(today, date);
}
