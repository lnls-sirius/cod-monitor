import { SimulationData } from "../assets/interfaces/orbit";
import { ArchiverDataPoint } from "../data-access/interface";
import { fetchSimulationData } from "./simulation";
import archInterface from "../data-access";
import { BpmDispatcher, OrbitDispatcher, TimeDispatcher } from "../redux/dispatcher";
import control from "./Modals";

// Get the closest value of the position difference from a data point array,
// based on a reference date
export function getDataInArray(selectedDate: Date, dataArray: ArchiverDataPoint[]): number{
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
export async function getDataInArchiver(pv: Array<string>, refDate: Date): Promise<any> {
  let archiverInterval: any = await archInterface.fetchSeveralPV(pv, refDate);
  if(Object.keys(archiverInterval).length == 1){
    return archiverInterval[pv[0]]
  }
  return archiverInterval;
}

// Get an interval from Archiver
export async function getArchiver(name: string, start: Date, end: Date, optimization: number): Promise<undefined|ArchiverDataPoint[]>{
  try {
    const res = await archInterface.fetchData(
      name, start, end, optimization);
    const { data } = res;
    data.shift();
    return data;
  } catch (e) {
    console.log("Something went wrong!!" + e);
  }
}

// Get data from the backend simulations
export async function compSignatures(start: Date, end: Date): Promise<undefined|SimulationData>{
  try {
    const data = await fetchSimulationData(start, end);
    return data;
  } catch (e) {
    console.log("Something went wrong!!" + e);
    control.setAlert("Err_Server");
    TimeDispatcher.setChangeTime(false);
    BpmDispatcher.setChangeBpm(false);
    OrbitDispatcher.setChangeOrbit(false);
  }
}
