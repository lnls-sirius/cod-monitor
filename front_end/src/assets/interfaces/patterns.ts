import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ChangeBpmInterface } from "./bpm";
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
    initState?: boolean;
    isSmall?: boolean;
}

interface ModalInterface {
    title: string;
    component: React.ReactElement;
    icon: string;
    close?: () => void;
}

interface DatePointInterface {
    x: Date;
    y: number;
}

interface DatasetInterface{
    data: DatePointInterface[];
    xAxisID: string;
    label: string;
    borderColor?: string;
    backgroundColor?: string;
}

interface ChildrenInterface{
    children: React.ReactNode;
}

interface LegendInterface extends ChildrenInterface{
    color: string;
    isVisible: boolean;
    deleteAction: null | (() => void);
    visibleAction: () => void;
}

interface ChangeInterface
    extends ChangeBpmInterface, ChangeOrbitInterface{
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
    DatePointInterface,
    DatasetInterface,
    ChildrenInterface,
    LegendInterface,
    ChangeInterface,
    DictState,
    DictString,
    DictNumber,
    BaseStrArrayDict
}
