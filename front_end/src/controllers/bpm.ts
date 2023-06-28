import { reverseAxis } from "./patterns";
import { getClosestDate } from "./time";
import { BpmDispatcher } from "../redux/dispatcher";
import control from './Modals';
import { bpmGroups } from "../assets/constants/patterns";
import { ArrDictState } from "../assets/interfaces/types";
import { DictState } from "../assets/interfaces/patterns";
import { DictBPM } from "../assets/interfaces/bpm";
import { ArchiverDataPoint } from "../assets/interfaces/data_access";

// Format the BPM Axis with the axis
function getBpmName(name: string, axis: string): string {
    return name + ':Pos'+axis+'-Mon';
}

// Format BPM Name for visualization
function formatBPMName(name: string): string {
    name = name.replace('SI-', '');
    name = name.replace(':DI-BPM', '');
    name = name.replace('-Mon', '');
    return name;
}

// Save a list with all the selected BPMs
function saveBPMList(ledProps: DictState, othAxis: DictState, axis: string): void {
    let list: DictBPM = {};
    Object.entries(ledProps).map(async ([name, prop]: ArrDictState) => {
        list[getBpmName(name, axis)] = [prop, true];
        list[getBpmName(name, reverseAxis(axis))] = [othAxis[name], true];
    });
    BpmDispatcher.setBpmList(JSON.stringify(list));
}

// Remove a BPM from the selection list
function deleteBPM(id: string, list: DictBPM): void {
    delete list[id];
    control.setAlert('Al_Rem_BPM');
    BpmDispatcher.setBpmList(JSON.stringify(list));
    BpmDispatcher.setChangeBpm(true);
}

// Toggle BPM visibility
function visibleBPM(id: string, list: DictBPM): void {
    list[id][1] = !list[id][1];
    control.setAlert('Vis_BPM');
    BpmDispatcher.setBpmList(JSON.stringify(list));
    BpmDispatcher.setChangeBpm(true);
}


// Remove change flag of BPM
function unsetBPMChange(): void {
    BpmDispatcher.setChangeBpm(false);
}

// Differentiate a list of data points
async function differentiateData(diffData: ArchiverDataPoint[], name: string, dates: Array<Date>): Promise<ArchiverDataPoint[]>{
    let valueComp: number = await getClosestDate(name, diffData, dates);
    diffData.map((point: ArchiverDataPoint) =>{
        point.y = Number((point.y - valueComp).toFixed(8));
    });
    return diffData;
}

// Get sector and BPM name of a PV name
function getSectionAndName(name: string): Array<string> {
    let nameDiv: Array<string> = name.split(':');
    let section: string = nameDiv[0].substring(3, 5);
    let bpm_name: string = nameDiv[0].substring(5, 7);
    if(nameDiv[1][nameDiv[1].length-1] !== 'M'){
        bpm_name += nameDiv[1].substring(nameDiv[1].length-2)
    }
    return [section, bpm_name]
}

// Generate a PV name of a BPM
function buildBPMName(section: string, name: string): string {
    let bpm_name: string;
    let bpmSufix: string = "DI";
    if(bpmGroups.sGroups.includes(name.substring(0,2))){
        bpmSufix = "ID"
    }
    if(name.includes('-1') || name.includes('-2')){
        let nameDiv: Array<string> = name.split('-');
        bpm_name = "SI-"+section+nameDiv[0]+":"+bpmSufix+"-BPM-"+nameDiv[1];
    }else{
        bpm_name = "SI-"+section+name+":"+bpmSufix+"-BPM";
    }
    return bpm_name
}

// Get if string is a BPM name
function isBPMName(name: string): boolean{
    let nameDiv: Array<string> = name.split(':');
    if(nameDiv.length!==2){
        return false
    }
    return true
}

export {
    getBpmName,
    formatBPMName,
    saveBPMList,
    deleteBPM,
    visibleBPM,
    unsetBPMChange,
    differentiateData,
    getSectionAndName,
    buildBPMName,
    isBPMName
}
