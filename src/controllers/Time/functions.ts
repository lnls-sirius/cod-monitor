import { ArchiverDataPoint } from "../../data-access/interface";
import { TimeDispatcher } from "../../redux/dispatcher";
import { getDataInArchiver, getDataInArray } from "../archiver";
import { DictBaseDate, TimeInformation } from "./interfaces";

export function outOfRange(start: Date, end: Date, timeMode: number): boolean{
  const now = new Date();
  let outRange = true;
  if(timeMode == 2 &&
      (start.getTime() > end.getTime() ||
      end.getTime() < start.getTime())){
          outRange = false;
  }
  if(start.getTime() > now.getTime() ||
      end.getTime() > now.getTime()){
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
      valueComp = await getDataInArchiver(name, dates[2]);
    }
    return valueComp;
  }
  return -1;
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

export function getDate(timeInfo: TimeInformation, type: string): Date{
  switch (type) {
    case 'Start':{
      return timeInfo.start;
    }
    case 'End':{
      return timeInfo.end;
    }
    case 'Ref':{
      return timeInfo.refDate;
    }
    default: {
      return new Date();
    }
  }
}

export function setDate(type: string, date: Date, onChange: boolean): void {
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
  if(onChange == true){
    TimeDispatcher.setChangeTime(true);
  }
}

export function setDateInterval(id: string, type: string, date: Date, list: DictBaseDate){
  if (id != undefined){
    if(type == 'Start'){
      if(outOfRange(date, new Date(list[id].end), 2)){
        list[id].start = date;
      }
    }else{
      if(outOfRange(new Date(list[id].start), date, 2)){
        list[id].end = date;
      }
    }
    TimeDispatcher.setIntervalList(list);
    TimeDispatcher.setChangeTime(true);
  }
}

export function deleteInterval(id: string, list: DictBaseDate){
  delete list[id];
  TimeDispatcher.setIntervalList(list);
  TimeDispatcher.setChangeTime(true);
}

export function countIntervalMode(intervalMode: number, onChange: boolean): void {
  if(intervalMode != 2){
    TimeDispatcher.setTimeMode(intervalMode + 1);
  }else{
    TimeDispatcher.setTimeMode(0);
  }
  if(onChange == true){
    TimeDispatcher.setChangeTime(true);
  }
}

export function getNewTimeInterval(time: number, dateRef: Date, intervalMode: number): Date{
  if(intervalMode == 0){
    time = -time;
  }
  return new Date(dateRef.getTime() + time);
}

export function updateTimeRef(timeMil: number, dateRef: Date, intervalMode: number): Date{
  let newDate = new Date();
  if (intervalMode!=2){
    newDate = getNewTimeInterval(
      timeMil, dateRef, intervalMode);      
  }
  return newDate;
}