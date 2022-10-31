import { ArchiverDataPoint } from "../../data-access/interface";
import { TimeDispatcher } from "../../redux/dispatcher";
import { getDataInArchiver, getDataInArray } from "../archiver";
import { intervals, refModes } from "../../assets/constants/date";
import { ArrDictArrStr } from "../../assets/interfaces/types";
import { DateInfoInterface } from "../../assets/interfaces/date";

export function pastDate(start: Date, end: Date): boolean{
  const now = new Date();
  let outRange = true;
  if(start.getTime() > now.getTime() ||
      end.getTime() > now.getTime()){
        outRange = false;
  }
  return outRange;
}

export function validInterval(start: Date, end: Date): boolean{
  let outRange = true;
  if(start.getTime() > end.getTime() ||
      end.getTime() < start.getTime()){
        outRange = false;
  }
  return outRange;
}

export async function getClosestDate(name: string, dataArray: ArchiverDataPoint[], dates: Array<Date>): Promise<number>{
  let closestDate = dates[2].getTime();
  let valueComp = 0;
  if(dates[2] != undefined){
    if (closestDate >= dates[0].getTime() &&
      closestDate <= dates[1].getTime()){
        valueComp = getDataInArray(dates[2], dataArray);
    }else{
      valueComp = await getDataInArchiver([name], dates[2]);
    }
    return valueComp;
  }
  return -1;
}

export function getIntervalFromMilliseconds(milliseconds: number): string{
  let int_name = '';
  Object.entries(intervals).map(([name, data]: ArrDictArrStr) => {
    const mil = Number(data[0]) * getTimeMilliseconds(data[1])
    if (mil == milliseconds){
      int_name = name;
    }
  })
  return int_name;
}

export function getTimeMilliseconds(unit: string): number{
  switch(unit){
      case "Second":{
          return 1000;
      }
      case "Minute": {
          return 60 * getTimeMilliseconds("Second");
      }
      case "Hour": {
          return 60 * getTimeMilliseconds("Minute");
      }
      case "Day": {
          return 24 * getTimeMilliseconds("Hour");
      }
      case "Week": {
          return 7 * getTimeMilliseconds("Day");
      }
      case "Month": {
          return 30 * getTimeMilliseconds("Day");
      }
      case "Year": {
          return 12 * getTimeMilliseconds("Month");
      }
  }
  return 0;
}

export function getDate(timeInfo: DateInfoInterface, type: string): Date{
  switch (type) {
    case 'Start':{
      return timeInfo.start;
    }
    case 'End':{
      return timeInfo.end;
    }
    case 'Ref':{
      if(timeInfo.refDate!=undefined){
        return timeInfo.refDate;
      };
      return new Date();
    }
    default: {
      return new Date();
    }
  }
}

export function setDate(type: string, date: Date): void {
  switch (type) {
    case 'Start':{
      TimeDispatcher.setStartDate(date);
      break;
    }
    case 'End':{
      TimeDispatcher.setEndDate(date);
      break;
    }
    case 'Ref':{
      TimeDispatcher.setRefDate(date);
      break;
    }
    default:{
      break;
    }
  }
  TimeDispatcher.setChangeTime(true);
}

export function changeInterval(dateInfo: DateInfoInterface, time: number, unit: string, intervalMode: number){
  const timeMil = time * getTimeMilliseconds(unit);
  const dateRef = getDate(dateInfo, refModes[intervalMode]);
  setDate(
    refModes[intervalMode],
    dateRef);
  TimeDispatcher.setIntervalMilliseconds(timeMil);
  TimeDispatcher.setChangeTime(true);
}

export function countIntervalMode(intervalMode: number): void {
  if(intervalMode != 2){
    TimeDispatcher.setTimeMode(intervalMode + 1);
  }else{
    TimeDispatcher.setTimeMode(0);
  }
  TimeDispatcher.setChangeTime(true);
}

export function getNewTimeInterval(time: number, dateRef: Date, intervalMode: number): Date{
  if(intervalMode == 0){
    time = -time;
  }
  return new Date(dateRef.getTime() + time);
}

export function updateTimeRef(timeMil: number, dateRef: Date, intervalMode: number): Date{
  let newDate = new Date();
  newDate = getNewTimeInterval(
    timeMil, dateRef, intervalMode);
  return newDate;
}
