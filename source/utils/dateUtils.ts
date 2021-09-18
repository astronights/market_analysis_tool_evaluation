export const getTimeStamp = (date: Date): number => {
  return Math.floor(roundDate(date).getTime() / 1000);
};

export const getTimeStampLastWeek = (date: Date): number => {
  return Math.floor(
    roundDate(new Date(new Date().setDate(date.getDate() - 7))).getTime() / 1000
  );
};

export const getTimeStampYesterday = (date: Date): number => {
  return Math.floor(
    roundDate(new Date(new Date().setDate(date.getDate() - 1))).getTime() / 1000
  );
};

const roundDate = (date: Date): Date => {
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0);
  return date;
};
