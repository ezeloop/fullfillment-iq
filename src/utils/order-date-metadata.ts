import Holidays from 'date-holidays';

const hd = new Holidays('AR');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getOrderMetadata(date: Date) {
  const dayOfWeek = date.getDay(); //0 (Dom) - 6 (Sab)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isHoliday = !!hd.isHoliday(date);

  return {
    dayOfWeek,
    dayOfWeekText: days[dayOfWeek],
    isWeekend,
    isHoliday,
  };
}
