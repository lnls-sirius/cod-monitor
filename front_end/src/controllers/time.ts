import { ArchiverDataPoint } from "../assets/interfaces/data_access";
import { TimeDispatcher } from "../redux/dispatcher";
import { getDataInArchiver, getDataInArray } from "./archiver";
import control from "./Modals";
import { intervals } from "../assets/constants/date";
import { ArrDictArrStr } from "../assets/interfaces/types";
import { DateInfoInterface } from "../assets/interfaces/date";
import { DictNumber } from "../assets/interfaces/patterns";


// Detect if the date is in the past
function pastDate(start: Date, end: Date): boolean{
  const now: Date = new Date();
  let outRange: boolean = true;
  if(start.getTime() > now.getTime() ||
      end.getTime() > now.getTime()){
        outRange = false;
  }
  return outRange;
}

// Detect if the selected interval is a valid one
function validInterval(start: Date, end: Date): boolean{
  let outRange: boolean = true;
  if(start.getTime() > end.getTime() ||
      end.getTime() < start.getTime()){
        outRange = false;
  }
  return outRange;
}

// Get the difference value based on the reference date
async function getClosestDate(name: string, dataArray: ArchiverDataPoint[], dates: Array<Date>): Promise<number>{
  let closestDate: number = dates[2].getTime();
  if(dates[2] !== undefined){
    if (closestDate >= dates[0].getTime() &&
      closestDate <= dates[1].getTime()){
        return getDataInArray(dates[2], dataArray);
    }else{
      const valueRef: undefined|DictNumber = await getDataInArchiver([name], dates[2]);
      if(valueRef!==undefined){
        if(Object.keys(valueRef).length === 1){
          return valueRef[name]
        }
      }
    }
  }
  return 0;
}

// Get interval name with the milliseconds interval
function getIntervalFromMilliseconds(milliseconds: number): string{
  let int_name: string = '';
  Object.entries(intervals).map(([name, data]: ArrDictArrStr) => {
    const mil: number = Number(data[0]) * getTimeMilliseconds(data[1])
    if (mil === milliseconds){
      int_name = name;
    }
  })
  return int_name;
}

// Get milliseconds time from interval configuration
function getTimeMilliseconds(unit: string): number{
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

// Get one of the configurable dates
function getDate(timeInfo: DateInfoInterface, type: string): Date {
  switch (type) {
    case 'Start':{
      return timeInfo.start;
    }
    case 'End':{
      return timeInfo.end;
    }
    case 'Ref':{
      if(timeInfo.refDate!==undefined){
        return timeInfo.refDate;
      };
      return new Date();
    }
    default: {
      return new Date();
    }
  }
}

// Set one of the configurable dates
function setDate(type: string, date: Date): void {
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
  control.setAlert('Ch_Date');
}

// Change the selected time interval
function changeInterval(dateInfo: DateInfoInterface, time: number, unit: string, intervalMode: string): void {
  const timeMil: number = time * getTimeMilliseconds(unit);
  const dateRef: Date = getDate(dateInfo, intervalMode);
  TimeDispatcher.setIntervalMilliseconds(timeMil);
  setDate(
    intervalMode,
    dateRef);
}

// Change the interval mode
function setIntervalMode(intervalMode: string): void {
  TimeDispatcher.setTimeMode(intervalMode);
  TimeDispatcher.setChangeTime(true);
}

// Get a date from the time interval
function getNewTimeInterval(timeMil: number, dateRef: Date, intervalMode: string): Date{
  if(intervalMode === 'End'){
    timeMil = -timeMil;
  }
  return new Date(dateRef.getTime() + timeMil);
}

// Change date with a click
function changeDateClick(newRefDate: Date, keyPressed: string): void {
  let date_to_change = null
  keyPressed = keyPressed.toLowerCase()
  if(keyPressed === 'd'){
    date_to_change = 'Ref'
  }else if(keyPressed === '1'){
    TimeDispatcher.setTimeMode('None')
    date_to_change = 'Start'
  }else if(keyPressed === '2'){
    TimeDispatcher.setTimeMode('None')
    date_to_change = 'End'
  }
  if(date_to_change!==null){
    setDate(date_to_change, newRefDate);
  }
}

export {
  pastDate,
  validInterval,
  getClosestDate,
  getIntervalFromMilliseconds,
  getTimeMilliseconds,
  getDate,
  setDate,
  changeInterval,
  setIntervalMode,
  getNewTimeInterval,
  changeDateClick
}
