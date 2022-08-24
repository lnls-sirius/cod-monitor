import { ArchiverDataPoint } from "../../data-access/interface";
import { getClosestDate } from "../Time/functions";
import { DataInterface, DatasetInterface, DictString } from "./interfaces";

function getRandomColor(): string {
    let letters = '0123456789ABC';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor((Math.random() * 13))];
    }
    return color;
}

function getColor(name: string, axisColors: DictString): string {
    if(!(name in axisColors) && name != undefined){
      axisColors[name] = getRandomColor();
    }
    return axisColors[name];
}


export function setAxisColor(name: string, state: DatasetInterface, axisColors: DictString): DatasetInterface{
    const color = getColor(name, axisColors);
    state.backgroundColor = color;
    state.borderColor = color;
    return state;
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
        x: data.x.toLocaleString(),
        y: data.y
      };
    });
}
