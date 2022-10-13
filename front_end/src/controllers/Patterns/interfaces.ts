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

export interface ActiveListInterface {
    state_list: DictState
}

export interface ChartProperties
    extends TimeInformation, ChangeInterface, ActiveListInterface {
        axis: string;
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

export interface LegendInterface{
    color: string;
    children: React.ReactChild;
    deleteAction: () => void;
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

export interface DictNumber {
    [key: string]: number;
}
