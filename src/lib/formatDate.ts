export function formatDate(date: string): string {
  const now = new Date();
  const parsedDate = new Date(date);

  const timeDifference = now.getTime() - parsedDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 0) {
    if (days <= 30) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else {
      const remainingDays = days % 30;
      const monthsPart = Math.floor(days / 30);
      if (remainingDays === 0) {
        return monthsPart === 1 ? '1 month ago' : `${monthsPart} months ago`;
      } else {
        return `${monthsPart === 0 ? '' : `${monthsPart} months and `}${
          remainingDays === 1 ? '1 day' : `${remainingDays} days`
        } ago`;
      }
    }
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
  }
}
