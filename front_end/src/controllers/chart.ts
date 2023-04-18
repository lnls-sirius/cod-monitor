import control from "./Chart";
import { colors } from "../assets/style/themes";
import { getSectionAndName } from "./bpm";
import { DatasetInterface, DatePointInterface, DictString } from "../assets/interfaces/patterns";
import { ArchiverDataPoint } from "../assets/interfaces/data_access";
import { bpmGroups } from "../assets/constants/patterns";

// Generate a random color
function getRandomColor(): string {
    let letters: string = '23456789ABCD';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor((Math.random() * letters.length))];
    }
    return color;
}

// Get BPM color based on the name
function getBPMColor(section: number, name: string, yAxis: boolean): string {
  let hex: string = (12.7*section).toString(16).toUpperCase();
  let hex2: string = (30*bpmGroups.bpmName.indexOf(name)).toString(16).toUpperCase();
  if(section===1){
    hex = '0C'
  }
  let min_var: string = hex.substring(1,2);
  let min_var2: string = hex2.substring(0,1);
  let color_string: string = min_var2+min_var+hex.substring(0,2)+min_var+min_var2;
  if(yAxis){
    color_string = color_string.split("").reverse().join("")
  }
  return '#'+color_string;
}

// Get axis color, or create it if it doesn't exist
function getColor(name: string): string {
    const axisColors: DictString = control.getAxisColors();
    if(!(name in axisColors) && name !== undefined){
      if (name === 'cod_rebuilt'){
        axisColors[name] = colors.chart.cod_rebuilt
      }else if(name.includes('BPM')){
        const [section, bpm_name] = getSectionAndName(name);
        axisColors[name] = getBPMColor(
          parseInt(section), bpm_name, name.includes('Y'));
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
