import dayjs from 'dayjs';

export const dateFormat = (date) => {
  return dayjs(date).format('YYYY-MM');
}

export const dateFormatToDay = (date) => {
  return dayjs(date).format('MM-DD');
}

export const dateFormatReadable = (date) => {
  const str = dayjs(date).format('YYYY年MM月DD日');
  // 如果是今天则返回今天
  if (str === dayjs().format('YYYY年MM月DD日')) {
    return '今天';
  }
  // 如果是昨天则返回昨天
  if (str === dayjs().subtract(1, 'day').format('YYYY年MM月DD日')) {
    return '昨天';
  }
  // 如果是前天则返回前天
  if (str === dayjs().subtract(2, 'day').format('YYYY年MM月DD日')) {
    return '前天';
  }
  return str;
}
