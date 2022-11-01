import { reverseAxis } from "./patterns";
import { getClosestDate } from "./time";
import { BpmDispatcher } from "../redux/dispatcher";
import { ArrDictState } from "../assets/interfaces/types";
import { DatePointInterface, DictState } from "../assets/interfaces/patterns";


// Format the BPM Axis with the axis
export function getBpmName(name: string, axis: string): string {
    return name + ':Pos'+axis+'-Mon';
}

// Format BPM Name for visualization
export function formatBPMName(name: string): string {
    name = name.replace('SI-', '');
    name = name.replace(':DI-BPM', '');
    name = name.replace('-Mon', '');
    return name;
}

// Save a list with all the selected BPMs
export function saveBPMList(ledProps: DictState, othAxis: DictState, axis: string): void {
    let list: DictState = {};
    Object.entries(ledProps).map(async ([name, prop]: ArrDictState) => {
        list[getBpmName(name, axis)] = prop;
        list[getBpmName(name, reverseAxis(axis))] = othAxis[name];
    });
    BpmDispatcher.setBpmList(JSON.stringify(list));
}

// Remove a BPM from the selection list
export function deleteBPM(id: string, list: DictState): void {
    delete list[id];
    BpmDispatcher.setBpmList(JSON.stringify(list));
    BpmDispatcher.setChangeBpm(true);
}

// Remove change flag of BPM
export function unsetBPMChange(): void {
    BpmDispatcher.setChangeBpm(false);
}

// Differentiate a list of data points
export async function differentiateData(diffData: DatePointInterface[], name: string, dates: Array<Date>): Promise<DatePointInterface[]>{
    let valueComp: number = await getClosestDate(name, diffData, dates);
    diffData.map((point) =>{
        point.y = point.y - valueComp;
    });
    return diffData;
}
