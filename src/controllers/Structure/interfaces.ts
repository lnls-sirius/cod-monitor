import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

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

export interface MenuItems {
    title: string;
    component: JSX.Element;
    icon?: IconDefinition;
    text?: string;
}

export interface ModalInterface {
    title: string;
    state: boolean;
    component: JSX.Element;
    close: () => void;
}
