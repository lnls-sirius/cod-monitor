import { TimeDispatcher } from "../../redux/dispatcher";
import { BaseDateInterface, DictBaseDate, TimeInformation } from "./interfaces";
import { getRefArchiver} from "../archiver";

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

export async function getClosestDate(name: string, selectedDate: Date): Promise<number>{
  const refDate = await getRefArchiver(name, selectedDate);
  let closestDate = selectedDate.getTime();
  let valueComp = 0;
  try{
    if(refDate != undefined){
      refDate.map((point) =>{
        let dateDiff = (selectedDate.getTime() - point.x.getTime());
        if(dateDiff < 0){
          dateDiff *= -1;
        }
        if(closestDate > dateDiff){
          closestDate = dateDiff;
          valueComp = point.y;
        }
      });
      return valueComp;
    }
  }catch(e){
    console.log("Error " + e);
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

export function countIntervalMode(intervalMode: number): void {

  if(intervalMode != 2){
    TimeDispatcher.setTimeMode(intervalMode + 1);
  }else{
    TimeDispatcher.setTimeMode(0);
  }
  TimeDispatcher.setChangeTime(true);
}

export function getIntervalTime(time: number, dateRef: Date, intervalMode: number): Date{
  if(intervalMode == 0){
    time = -time;
  }
  return new Date(dateRef.getTime() + time);
}
