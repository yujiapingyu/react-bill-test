import dayjs from 'dayjs';

export const dateFormat = (date) => {
  return dayjs(date).format('YYYY-MM');
}