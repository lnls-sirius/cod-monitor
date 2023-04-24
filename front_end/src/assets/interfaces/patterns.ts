import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { BpmPointInterface, ChangeBpmInterface } from "./bpm";
import { ArchiverDataPoint } from "./data_access";
import { ChangeOrbitInterface } from "./orbit";
import { DispatchBool } from "./types";

interface BasicLed{
    id: string;
    mountData: (setFunction: DispatchBool, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

interface OnMount
    extends BasicLed, StateInterface{
}

interface SetterDictState {
    [key: string]: DispatchBool;
}

interface StateInterface {
    state: boolean;
}

interface IconListInterface{
    [key: string]: IconDefinition
}

interface IconStyle extends StateInterface {
    small: boolean | undefined;
}

interface ActionItem {
    action: ()=>void;
    icon: string;
    stateActive: boolean;
    tooltip: string;
    initState?: boolean;
    isSmall?: boolean;
}

interface ModalInterface {
    title: string;
    component: React.ReactElement;
    icon: string;
    close: () => void;
}

interface DatasetInterface {
    data: Array<ArchiverDataPoint|BpmPointInterface>;
    xAxisID: string;
    label: string;
    borderColor?: string;
    backgroundColor?: string;
}

interface BaseChartInterface {
    id: number,
    options: any,
    data: any
}

interface GestureInterface
    extends ChildrenInterface, InfoTypeInterface{
        gestureHandler: (evt: any)=>void;
}

interface ChildrenInterface {
    children: React.ReactNode;
}

interface HeaderInterface
    extends ChildrenInterface {
        timeRef: boolean
}

interface TooltipInterface
    extends ChildrenInterface {
        text: string,
        movable: boolean
}

interface LegendInterface extends ChildrenInterface {
    color: string;
    isVisible: boolean;
    deleteAction: null | (() => void);
    visibleAction: () => void;
}

interface ChangeInterface
    extends ChangeBpmInterface, ChangeOrbitInterface {
}

interface InfoTypeInterface {
    type: string;
}

interface DictState {
    [key: string]: boolean;
}

interface DictString {
    [key: string]: string;
}

interface DictNumber {
    [key: string]: number;
}

interface BaseStrArrayDict {
    [key: string]: Array<string>
}

export type {
    BasicLed,
    OnMount,
    SetterDictState,
    StateInterface,
    IconListInterface,
    IconStyle,
    ActionItem,
    ModalInterface,
    BaseChartInterface,
    DatasetInterface,
    HeaderInterface,
    GestureInterface,
    ChildrenInterface,
    LegendInterface,
    TooltipInterface,
    ChangeInterface,
    InfoTypeInterface,
    DictState,
    DictString,
    DictNumber,
    BaseStrArrayDict
}
