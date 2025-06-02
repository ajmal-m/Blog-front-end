import { formatDistanceToNow } from 'date-fns';

export const formatWithCommas = (num : number) => {
  return new Intl.NumberFormat().format(num);
};

export const formatNumberShort = (num : number) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
}

export const getTimeToNow = (dateString : string) => {
   return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}
