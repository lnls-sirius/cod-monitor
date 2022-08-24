import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type DispatchBool = React.Dispatch<React.SetStateAction<boolean>>;
export type ArrDictState = [key: string, value: boolean];

export interface OnMount {
    id: string;
    initState: boolean;
    mountData: (setFunction: DispatchBool, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

export interface InitLed {
    id: string;
    axis: string;
    mountData: (setFunction: DispatchBool, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

export interface DictState {
    [key: string]: boolean;
}

export interface SetterDictState {
    [key: string]: DispatchBool;
}

export interface LedInterface {
    state: boolean;
}

export interface ModalItem {
    id: string;
    icon: IconDefinition;
    setModalId: React.Dispatch<React.SetStateAction<string>>;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ActionItem {
    icon: IconDefinition;
    action: ()=>void;
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
    }
}

export interface ChartInterface {
    options: any;
    datasets: any;
    clickAction: (evt: any) => void;
}
