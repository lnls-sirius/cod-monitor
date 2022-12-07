import { reverseAxis } from "./patterns";
import { getClosestDate } from "./time";
import { BpmDispatcher } from "../redux/dispatcher";
import control from './Modals';
import { ArrDictState } from "../assets/interfaces/types";
import { DatePointInterface, DictState } from "../assets/interfaces/patterns";
import { DictBPM } from "../assets/interfaces/bpm";

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
async function differentiateData(diffData: DatePointInterface[], name: string, dates: Array<Date>): Promise<DatePointInterface[]>{
    let valueComp: number = await getClosestDate(name, diffData, dates);
    diffData.map((point) =>{
        point.y = point.y - valueComp;
    });
    return diffData;
}

export {
    getBpmName,
    formatBPMName,
    saveBPMList,
    deleteBPM,
    visibleBPM,
    unsetBPMChange,
    differentiateData
}