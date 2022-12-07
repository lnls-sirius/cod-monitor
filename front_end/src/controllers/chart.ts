import control from "./Chart";
import { colors } from "../assets/style/themes";
import { DatasetInterface, DatePointInterface, DictString } from "../assets/interfaces/patterns";
import { ArchiverDataPoint } from "../assets/interfaces/data_access";

// Generate a random color
function getRandomColor(): string {
    let letters: string = '23456789ABCD';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor((Math.random() * letters.length))];
    }
    return color;
}

// Get axis color, or create it if it doesn't exist
function getColor(name: string): string {
    const axisColors: DictString = control.getAxisColors();
    if(!(name in axisColors) && name != undefined){
      if (name == 'cod_rebuilt'){
        axisColors[name] = colors.chart.cod_rebuilt
      }else{
        axisColors[name] = getRandomColor();
      }
    }
    return axisColors[name];
}

// Set the axis color on the chart
function setAxisColor(name: string, state: DatasetInterface): DatasetInterface{
    let color: string = getColor(name);
    state.backgroundColor = color;
    state.borderColor = color;
    return state;
}

// Build a list of data points from a list from Archiver
function buildDataset(dataList: ArchiverDataPoint[]): DatePointInterface[]{
  return dataList.map((data: ArchiverDataPoint) => {
    return {
      x: data.x,
      y: data.y
    };
  });
}

export {
  getRandomColor,
  getColor,
  setAxisColor,
  buildDataset
}
