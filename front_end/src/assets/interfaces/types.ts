import { DictState } from "./patterns";

export type DispatchBool = React.Dispatch<React.SetStateAction<boolean>>;
export type DispatchString = React.Dispatch<React.SetStateAction<string>>;
export type DispatchDictState = React.Dispatch<React.SetStateAction<DictState>>;
export type ArrDictState = [string, boolean];
export type ArrDictArrStr = [string, Array<string>];
export type DictOrbitData = [string, string, number, number];
export type OrbitData = [string, string, string, number, number];
