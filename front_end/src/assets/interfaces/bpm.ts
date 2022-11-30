import { TimeInformation } from "./date";
import { BasicLed, DictState } from "./patterns";

interface InitLed extends BasicLed{
    axis: string;
    ledProps: DictState;
    othAxis: DictState;
}

interface ActiveListInterface {
    state_list: DictBPM
}

interface ChartDiffProperties
    extends TimeInformation, ChangeBpmInterface, ActiveListInterface {
}

interface BpmPointInterface {
    x: string,
    y: number
}

interface DatasetInterface1{
    data: BpmPointInterface[];
    xAxisID: string;
    label: string;
    borderColor?: string;
    backgroundColor?: string;
}

interface ChangeBpmInterface{
    changeBpm: boolean;
    changeTime: boolean;
}

interface DictBPM {
    [key: string]: Array<boolean>;
}

export type {
    InitLed,
    ActiveListInterface,
    ChartDiffProperties,
    BpmPointInterface,
    DatasetInterface1,
    ChangeBpmInterface,
    DictBPM
}
