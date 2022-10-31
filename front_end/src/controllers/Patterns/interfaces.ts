import React from "react";
import { TimeInformation } from "../Time/interfaces";

export type DispatchBool = React.Dispatch<React.SetStateAction<boolean>>;
export type ArrDictState = [key: string, value: boolean];

export interface SelectedInterface {
    selected: boolean
}

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
    action: ()=>void;
    icon: string;
    stateActive?: boolean;
    isSmall?: boolean;
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
        icon: string;
        close: () => void;
    }
}

export interface ActiveListInterface {
    state_list: DictState
}

export interface ChartProperties
    extends TimeInformation, ChangeBpmInterface, ActiveListInterface {
}

export interface BpmPointInterface {
    x: string,
    y: number
}

export interface DatePointInterface {
    x: Date;
    y: number;
}

export interface DatasetInterface{
    data: DatePointInterface[];
    xAxisID: string;
    label: string;
    borderColor?: string;
    backgroundColor?: string;
}

export interface DatasetInterface1{
    data: BpmPointInterface[];
    xAxisID: string;
    label: string;
    borderColor?: string;
    backgroundColor?: string;
}

export interface LegendInterface{
    color: string;
    children: React.ReactChild;
    deleteAction: null | (() => void);
}

export interface ChangeBpmInterface{
    changeBpm: boolean;
    changeTime: boolean;
}

export interface ChangeOrbitInterface{
    changeOrbit: boolean;
    changeTime: boolean;
}

export interface ChangeInterface
    extends ChangeBpmInterface, ChangeOrbitInterface{
}

export interface DictState {
    [key: string]: boolean;
}

export interface DictString {
    [key: string]: string;
}

export interface DictNumber {
    [key: string]: number;
}

export interface BaseStrArrayDict {
    [key: string]: Array<string>
}
