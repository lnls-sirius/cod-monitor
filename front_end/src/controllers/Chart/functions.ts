import { ArchiverDataPoint } from "../../data-access/interface";
import { getClosestDate } from "../Time/functions";
import { DatePointInterface, DatasetInterface, DictState } from "../Patterns/interfaces";
import { pos } from "../../assets/bpms/pos";
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

export function formatBPMName(name: string){
  name = name.replace('SI-', '');
  name = name.replace(':DI-BPM', '');
  name = name.replace('-Mon', '');
  return name;
}

export function setAxisColor(name: string, state: DatasetInterface): DatasetInterface{
  const color = getColor(name);
  state.backgroundColor = color;
  state.borderColor = color;
  return state;
}

export function deleteItem(item: string, list: DictState): DictState {
  Object.entries(list).map(([name, state]) => {
    if(state && item == name){
      delete list[name];
    }
  });
  return list;
}

export async function differentiateData(diffData: DatePointInterface[], name: string, dates: Array<Date>): Promise<DatePointInterface[]>{
  let valueComp = await getClosestDate(name, diffData, dates);
  diffData.map((point) =>{
    point.y = point.y - valueComp;
  });
  return diffData;
}

export const buildDataset = (dataList: ArchiverDataPoint[]): DatePointInterface[] => {
  return dataList.map((data: ArchiverDataPoint) => {
    return {
      x: data.x,
      y: data.y
    };
  });
}

export const buildDatasetOrbit = (dataList: any): Array<any> => {
  return dataList.map((sign_data: any, idx: number) => {
    return {
      x: formatBPMName(pos[idx]),
      y: sign_data
    }
  });
}
