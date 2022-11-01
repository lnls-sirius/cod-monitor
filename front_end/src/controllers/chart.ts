import control from "./Chart";
import { DatasetInterface, DatePointInterface, DictString } from "../assets/interfaces/patterns";
import { ArchiverDataPoint } from "../data-access/interface";

// Generate a random color
function getRandomColor(): string {
    let letters: string = '0123456789ABC';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor((Math.random() * 13))];
    }
    return color;
}

// Get axis color, or create it if it doesn't exist
export function getColor(name: string): string {
    const axisColors: DictString = control.getAxisColors();
    if(!(name in axisColors) && name != undefined){
      axisColors[name] = getRandomColor();
    }
    return axisColors[name];
}

// Set the axis color on the chart
export function setAxisColor(name: string, state: DatasetInterface): DatasetInterface{
    const color: string = getColor(name);
    state.backgroundColor = color;
    state.borderColor = color;
    return state;
}

// Build a list of data points from a list from Archiver
export function buildDataset(dataList: ArchiverDataPoint[]): DatePointInterface[]{
  return dataList.map((data: ArchiverDataPoint) => {
    return {
      x: data.x,
      y: data.y
    };
  });
}
