import { formatDistanceToNow } from 'date-fns';

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};