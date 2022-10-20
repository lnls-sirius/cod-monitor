import archInterface from "../data-access";
import { ArchiverDataPoint } from "../data-access/interface";
import { fetchSimulationData } from "./simulation";

export function getDataInArray(selectedDate: Date, dataArray: ArchiverDataPoint[]): number{
  let valueComp = 0;
  let closestDate = selectedDate.getTime();

  dataArray.map((point) =>{
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

export async function getDataInArchiver(pv: Array<string>, refDate: Date){
  let archiverInterval = await archInterface.fetchSeveralPV(pv, refDate);
  if(Object.keys(archiverInterval).length == 1){
    return archiverInterval[pv[0]]
  }
  return archiverInterval;
}

export async function getArchiver(name: string, start: Date, end: Date, optimization: number){
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

export async function compSignatures(start: Date, end: Date){
  try {
    const data = await fetchSimulationData(start, end);
    return data;
  } catch (e) {
    console.log("Something went wrong!!" + e);
  }
}
