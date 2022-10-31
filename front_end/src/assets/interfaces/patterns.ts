import React from "react";
import { TimeInformation } from "./date";
import { DispatchBool } from "./types";


export interface SelectedInterface {
    selected: boolean
}

interface BasicLed{
    id: string;
    mountData: (setFunction: DispatchBool, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

export interface OnMount extends BasicLed, LedInterface{
}

export interface InitLed extends BasicLed{
    axis: string;
    ledProps: DictState;
    othAxis: DictState;
}

export interface SetterDictState {
    [key: string]: DispatchBool;
}

export interface LedInterface {
    state: boolean;
}

export interface IconStyle extends LedInterface {
    small: boolean | undefined;
}

export interface ActionItem {
    action: ()=>void;
    icon: string;
    stateActive?: boolean;
    isSmall?: boolean;
}

export interface ModalInterface extends LedInterface {
    id: string;
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

export interface ChildrenInterface{
    children: React.ReactNode;
}

export interface LegendInterface extends ChildrenInterface{
    color: string;
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
