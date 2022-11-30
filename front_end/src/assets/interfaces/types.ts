import { DictState } from "./patterns";

type DispatchBool = React.Dispatch<React.SetStateAction<boolean>>;
type DispatchString = React.Dispatch<React.SetStateAction<string>>;
type DispatchDictState = React.Dispatch<React.SetStateAction<DictState>>;
type ArrDictState = [string, boolean];
type ArrDictArrStr = [string, Array<string>];
type DictOrbitData = [string, string, number, number];
type OrbitData = [string, string, string, number, number];

export type {
    DispatchBool,
    DispatchString,
    DispatchDictState,
    ArrDictState,
    ArrDictArrStr,
    DictOrbitData,
    OrbitData
}
