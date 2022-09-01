import { ArchiverDataPoint } from "../../data-access/interface";
import { getClosestDate } from "../Time/functions";
import { DataInterface, DatasetInterface, DictState } from "../Patterns/interfaces";
import { BpmDispatcher } from "../../redux/dispatcher";
import control from "./";

function getRandomColor(): string {
  let letters = '0123456789ABC';
  let color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor((Math.random() * 13))];
  }
  return color;
}

export function getColor(name: string): string {
  const axisColors = control.getAxisColors();
  if(!(name in axisColors) && name != undefined){
    axisColors[name] = getRandomColor();
  }
  return axisColors[name];
}

export function setAxisColor(name: string, state: DatasetInterface): DatasetInterface{
  const color = getColor(name);
  state.backgroundColor = color;
  state.borderColor = color;
  return state;
}

export function deleteBpm(nameBpm: string, bpmList: DictState): void {
  Object.entries(bpmList).map(([name, state]) => {
    if(state && nameBpm == name){
      delete bpmList[name];
    }
  });
  BpmDispatcher.setBpmList(JSON.stringify(bpmList));
  BpmDispatcher.setChangeBpm(true);
}

export async function differentiateData(diffData: DataInterface[], name: string, refDate: Date): Promise<DataInterface[]>{
  let valueComp = await getClosestDate(name, refDate);
  diffData.map((point) =>{
    point.y = point.y - valueComp;
  });
  return diffData;
}

export const buildDataset = (dataList: ArchiverDataPoint[]): DataInterface[] => {
  return dataList.map((data: ArchiverDataPoint) => {
    return {
      x: data.x,
      y: data.y
    };
  });
}
