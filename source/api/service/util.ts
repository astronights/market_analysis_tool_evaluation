export const getHour = (date: Date): number => {
  return Math.floor(roundDate(date).getTime() / 1000);
};

const roundDate = (date: Date): Date => {
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0);
  return date;
};
