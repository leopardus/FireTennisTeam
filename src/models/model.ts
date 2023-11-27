export type TennisEventModel = {
  guid: string;
  players: Player[];
  year: number;
  month: number;
  day: number;
  startHour: DateTimeField;
  endHour: DateTimeField;
  duration: string;
  tennisTrainer: string;
  tennisField: string;
  conditions: string;
  light: string;
  warm: string;
}

export interface DateTimeField {
  hour: number;
  minutes: number;
}

export interface Player {
    id:string;
    active:boolean;
    age:string;
    fitness:boolean;
    gmail:string;
    gmail2:string;
    level:string;
    mainTrainer:string;

    name:string;
    nick:string;
    payField:boolean;
    payTrainer:boolean;
    tests:boolean;
    pricePlan: PricePlan;
    
    color: string;
    fullName: string;
}

export interface PricePlan{
    name: string;
    individual: number;
    grup: number;
    teren: number;
    lumina: number;
    caldura: number;
}

export interface TimePickerModel {
  hours: number;
  minutes: number;
  seconds: number;
}