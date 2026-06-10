export const formatTime = (time?: string | Date): string => {
  if (!time) return '';
  const date = new Date(time);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  // check for invalid date strings like "10 mins ago (no backend yet)"
  if (isNaN(date.getTime())) return String(time);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hrs ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
};
