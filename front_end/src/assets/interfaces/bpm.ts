import { TimeInformation } from "./date";
import { BasicLed, DictState } from "./patterns";

export interface InitLed extends BasicLed{
    axis: string;
    ledProps: DictState;
    othAxis: DictState;
}

export interface ActiveListInterface {
    state_list: DictBPM
}

export interface ChartDiffProperties
    extends TimeInformation, ChangeBpmInterface, ActiveListInterface {
}

export interface BpmPointInterface {
    x: string,
    y: number
}

export interface DatasetInterface1{
    data: BpmPointInterface[];
    xAxisID: string;
    label: string;
    borderColor?: string;
    backgroundColor?: string;
}

export interface ChangeBpmInterface{
    changeBpm: boolean;
    changeTime: boolean;
}

export interface DictBPM {
    [key: string]: Array<boolean>;
}
