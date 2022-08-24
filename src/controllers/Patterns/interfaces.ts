import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { TimeInformation } from "../Time/interfaces";

export type DispatchBool = React.Dispatch<React.SetStateAction<boolean>>;
export type ArrDictState = [key: string, value: boolean];

interface BasicLed{
    id: string;
    mountData: (setFunction: DispatchBool, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

export interface OnMount extends BasicLed {
    initState: boolean;
}

export interface InitLed extends BasicLed{
    axis: string;
}

export interface SetterDictState {
    [key: string]: DispatchBool;
}

export interface LedInterface {
    state: boolean;
}

export interface ActionItem {
    icon: IconDefinition;
    action: ()=>void;
}

export interface ModalItem {
    id: string;
    icon: IconDefinition;
    setModalId: React.Dispatch<React.SetStateAction<string>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalInterface {
    id: string;
    state: boolean;
    close: () => void;
}

export interface ModalInfo {
    [key: string]: {
        title: string;
        component: React.ReactElement;
        icon: IconDefinition;
        close: () => void;
    }
}

export interface ChartInterface {
    options: any;
    datasets: any;
    clickAction: (evt: React.MouseEvent, chartInstance: any) => void;
}

export interface ChartProperties extends TimeInformation, ChangeInterface{
    bpmList: DictString;
}

export interface DataInterface {
    x: Date;
    y: number;
}

export interface DatasetInterface{
    data: DataInterface[],
    xAxisID: string,
    label: string,
    borderColor?: string,
    backgroundColor?: string
}

export interface BpmProperties {
    bpmList: DictString,
    bpmColors: DictString
}

export interface BpmInterface {
    name: string,
    color: string
}

export interface ChangeInterface{
    changeBpm: boolean;
    changeTime: boolean;
}

export interface DictState {
    [key: string]: boolean;
}

export interface DictString {
    [key: string]: string;
}
