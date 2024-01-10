import dayjs from 'dayjs';

export const dateFormat = (date) => {
  return dayjs(date).format('YYYY-MM');
}

export const dateFormatToDay = (date) => {
  return dayjs(date).format('MM-DD');
}
