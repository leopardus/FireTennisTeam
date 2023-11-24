import dayjs, { Dayjs } from "dayjs";

export interface ISmartCalendar {
  getEndHour(hours: number, minutes: number, duration: number): Date;
  getPrintDate(dateName: string): string;
  getDayNameDayNumberMonth(dateName: string): string;
  getDayNameDayNumberMonthEx(date: Date): string;
  index: number;
  getDayName: (day: number) => string;
  getMonthName(month: number): string;
  getDateAfterXNumberOfDays(xDays: number, date?: Date): string;
  getFormattedDay(date: Dayjs): string;
  getDateFromString(date: string, format: string): Date;
}

const calendar: ISmartCalendar = {
  index: 1,
  getEndHour(hours: number, minutes: number, duration: number) {
    const dateEnd = new Date();
    dateEnd.setHours(hours, minutes);
    const dateJS = dayjs(dateEnd);
    const newDate = dateJS.add(duration, "minute");
    return newDate.toDate();
  },

  getDayNameDayNumberMonthEx(date: Date) {
    const date2 = dayjs(date).format("YYYY-MM-DD");
    return calendar.getDayNameDayNumberMonth(date2);
  },
  getDayNameDayNumberMonth(dateName: string) {
    const dateJS = dayjs(dateName, "DD/MM/YYYY").toDate();

    const printDate = calendar.getDayName(dateJS.getDay()) + " " + dateJS.getDate() + ", " + calendar.getMonthName(dateJS.getMonth() + 1);
    return printDate;
  },

  getFormattedDay(date: Dayjs): string {
    const dateJS = dayjs(date).format("DD/MM/YYYY");
    return dateJS;
  },

  getPrintDate(date: string): string {
    const dateJS = dayjs(date, "DD/MM/YYYY");
    const printDate = calendar.getDayName(dateJS.toDate().getDay()) + " - " + date;
    return printDate;
  },

  getDateFromString(date: string, format: string): Date {
    const dateJS = dayjs(date, format);
    return dateJS.toDate();
  },

  getDateAfterXNumberOfDays(days: number, date: Date = new Date()) {
    return dayjs(date).add(days, "day").format("YYYY-MM-DD");
    //return dayjs(date).add(days, "day").format("DD/MM/YYYY");
  },

  getDayName(day: number): string {
    switch (day) {
      case 1:
        return Days.Luni;
      case 2:
        return Days.Marti;
      case 3:
        return Days.Miercuri;
      case 4:
        return Days.Joi;
      case 5:
        return Days.Vineri;
      case 6:
        return Days.Sambata;
      case 0:
        return Days.Duminica;
      default:
        throw Error("not found");
    }
  },
  getMonthName(month: number): string {
    switch (month) {
      case 1:
        return "ianuarie";
      case 2:
        return "februarie";
      case 3:
        return "martie";
      case 4:
        return "aprilie";
      case 5:
        return "mai";
      case 6:
        return "iunie";
      case 7:
        return "iulie";
      case 8:
        return "august";
      case 9:
        return "septembrie";
      case 10:
        return "octombrie";
      case 11:
        return "noiembrie";
      case 12:
        return "decembrie";
      default:
        throw Error("not found");
    }
  },
};

enum Days {
  Luni = "Luni",
  Marti = "Marti",
  Miercuri = "Miercuri",
  Joi = "Joi",
  Vineri = "Vineri",
  Sambata = "Sambata",
  Duminica = "Duminica",
}

export { calendar };
