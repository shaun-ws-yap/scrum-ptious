export default function formatDateString(date) {
  const dateString = date.toLocaleDateString('en-US', {
    day:    'numeric',
    month:  'short',
    year:   'numeric'
  });

  const timeString = date.toLocaleTimeString(undefined, {
    hour:   'numeric',
    minute: '2-digit',
});

  return dateString + " at " + timeString;
}