import { SignData } from "../assets/interfaces/orbit";
import { ArchiverDataPoint } from "../assets/interfaces/data_access";
import { DictNumber } from "../assets/interfaces/patterns";
import { fetchSimulationData } from "./simulation";
import archInterface from "../data-access";
import { BpmDispatcher, OrbitDispatcher, TimeDispatcher } from "../redux/dispatcher";
import control from "./Modals";

// Get the closest value of the position difference from a data point array,
// based on a reference date
function getDataInArray(selectedDate: Date, dataArray: ArchiverDataPoint[]): number {
  let valueComp: number = 0;
  let closestDate: number = selectedDate.getTime();

  dataArray.map((point) =>{
    let dateDiff: number = (selectedDate.getTime() - point.x.getTime());
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

// Get the closest value of the position difference from Archiver,
// based on a reference date
async function getDataInArchiver(pv: string, refDate: Date): Promise<number> {
  try {
    let archiverInterval: ArchiverDataPoint[] = await archInterface.fetchPointPV(pv, refDate);
    return getDataInArray(refDate, archiverInterval);
  } catch (e) {
    errorMsg();
  }
  return 0;
}

// Get an interval from Archiver
async function getArchiver(name: string, start: Date, end: Date, optimization: number): Promise<undefined|ArchiverDataPoint[]>{
  try {
    const res = await archInterface.fetchData(
      name, start, end, optimization);
    const { data } = res;
    data.shift();
    return data;
  } catch (e) {
    errorMsg();
  }
}

// Get data from the backend simulations
async function getSignatures(start: Date, end: Date): Promise<undefined|SignData>{
  try {
    const data = await fetchSimulationData(start, end);
    return data;
  } catch (e) {
    errorMsg();
  }
}

// Show Error Message
function errorMsg(): void {
  control.setAlert("Err_Server");
  TimeDispatcher.setChangeTime(false);
  BpmDispatcher.setChangeBpm(false);
  OrbitDispatcher.setChangeOrbit(false);
}

export {
  getDataInArray,
  getDataInArchiver,
  getArchiver,
  getSignatures
}
