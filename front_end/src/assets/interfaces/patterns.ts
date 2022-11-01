import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ChangeBpmInterface } from "./bpm";
import { ChangeOrbitInterface } from "./orbit";
import { DispatchBool } from "./types";

export interface BasicLed{
    id: string;
    mountData: (setFunction: DispatchBool, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

export interface OnMount
    extends BasicLed, StateInterface{
}

export interface SetterDictState {
    [key: string]: DispatchBool;
}

export interface StateInterface {
    state: boolean;
}

export interface iconListInterface{
    [key: string]: IconDefinition
}

export interface IconStyle extends StateInterface {
    small: boolean | undefined;
}

export interface ActionItem {
    action: ()=>void;
    icon: string;
    stateActive?: boolean;
    isSmall?: boolean;
}

export interface ModalInterface extends StateInterface {
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

export interface ChildrenInterface{
    children: React.ReactNode;
}

export interface LegendInterface extends ChildrenInterface{
    color: string;
    deleteAction: null | (() => void);
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
