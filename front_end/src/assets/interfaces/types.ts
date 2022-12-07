import { DatasetInterface, DictState } from "./patterns";

type DispatchBool = React.Dispatch<React.SetStateAction<boolean>>;
type DispatchString = React.Dispatch<React.SetStateAction<string>>;
type DispatchDictState = React.Dispatch<React.SetStateAction<DictState>>;
type SelectChange = React.ChangeEvent<HTMLSelectElement>;
type InputChange = React.ChangeEvent<HTMLInputElement>;
type ArrDictState = [string, boolean];
type ArrDictArrStr = [string, Array<string>];
type DictOrbitData = [string, string, number, number];
type OrbitData = [string, string, string, number, number];
type DatasetList = Array<DatasetInterface>

export type {
    DispatchBool,
    DispatchString,
    DispatchDictState,
    ArrDictState,
    ArrDictArrStr,
    DictOrbitData,
    OrbitData,
    SelectChange,
    InputChange,
    DatasetList
}
