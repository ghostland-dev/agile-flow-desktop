
export const getPriorityClasses = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'low':
      return 'bg-sky-100 text-sky-800 border-sky-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

export const getStatusClasses = (status: string) => {
  switch (status) {
    case 'done':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'in_progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'in_review':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
