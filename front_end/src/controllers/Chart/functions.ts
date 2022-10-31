import { ArchiverDataPoint } from "../../data-access/interface";
import { getClosestDate } from "../Time/functions";
import { DatePointInterface, DatasetInterface, DictState, BaseStrArrayDict } from "../../assets/interfaces/patterns";
import { pos } from "../../assets/bpms/pos";
import control from "./";
import { BpmDispatcher, OrbitDispatcher } from "../../redux/dispatcher";
import { getBpmName, reverseAxis } from "../Patterns/functions";
import { ArrDictState } from "../../assets/interfaces/types";

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

export function saveBPMList(ledProps: DictState, othAxis: DictState, axis: string){
  let list: DictState = {};
  Object.entries(ledProps).map(async ([name, prop]: ArrDictState) => {
    list[getBpmName(name, axis)] = prop;
    list[getBpmName(name, reverseAxis(axis))] = othAxis[name];
  });
  BpmDispatcher.setBpmList(JSON.stringify(list));
}

export function deleteBPM(id: string, list: DictState){
  delete list[id];
  BpmDispatcher.setBpmList(JSON.stringify(list));
  BpmDispatcher.setChangeBpm(true);
}

export function setAxisColor(name: string, state: DatasetInterface): DatasetInterface{
  const color = getColor(name);
  state.backgroundColor = color;
  state.borderColor = color;
  return state;
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

export function setSignature(id: string, element_info: any, list: BaseStrArrayDict){
  if (id != undefined){
    list[id] = element_info;
    OrbitDispatcher.setSignatureList(list);
  }
}

export function deleteSignature(id: string, list: BaseStrArrayDict){
  delete list[id];
  OrbitDispatcher.setSignatureList(list);
  OrbitDispatcher.setChangeOrbit(true);
}
