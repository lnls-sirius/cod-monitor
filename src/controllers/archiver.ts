import archInterface from "../data-access";
import { ArchiverDataPoint } from "../data-access/interface";

// export async function getRefArchiver(name: string, refDate: Date){
//     const now = new Date();
//     const interval = 100;
//     const start = new Date(refDate.getTime() - interval);
//     const endTime = refDate.getTime() + interval;
//     let end = now;
//     if (endTime < now.getTime()){
//       end = new Date(endTime);
//     }
//     return getArchiver(name, start, end, 1);
// }

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

export async function getDataInArchiver(pv: string, refDate: Date){
  const interval = 100;
  const startInt = new Date(refDate.getTime() - interval);
  const endInt = new Date(refDate.getTime() + interval);

  let archiverInterval = await archInterface.fetchData(pv, startInt, endInt, 1);

  let valueComp = getDataInArray(refDate, archiverInterval.data);

  return valueComp;
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
