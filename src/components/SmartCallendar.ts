import dayjs, { Dayjs } from "dayjs";

export interface ISmartCalendar {
    getPrintDate(dateName: string): string;
    index: number;
    getDayName: (day: number) => string;
    getDateAfterXNumberOfDays(xDays: number, date?: Date): string;
    getFormattedDay(date: Dayjs): string;
    getDateFromString(date: string, format: string): Date
}

const calendar: ISmartCalendar = {
    index: 1,

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
