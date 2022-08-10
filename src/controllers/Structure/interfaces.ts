import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface OnMount {
    id: string;
    initState: boolean;
    mountData: (setFunction: React.Dispatch<React.SetStateAction<boolean>>, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
}

export interface InitLed {
    id: string;
    axis: string;
    mountData: (setFunction: React.Dispatch<React.SetStateAction<boolean>>, id: string)=>void;
    updateData: (state: boolean, id: string)=>void;
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
