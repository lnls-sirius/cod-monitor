import { BaseDateInterface } from "./date"
import { BaseStrArrayDict, DictState } from "./patterns"
import { DispatchDictState, DispatchString, DictOrbitData } from "./types"

interface SignChartData {
    [key: string]: Array<Array<number>>
}

interface SignData {
    [key: string]: DictOrbitData
}

interface FilterInterface {
    setGlobExp: DispatchString,
    filterState: DictState,
    setFilterStates: DispatchDictState
}

interface SignatureListInterface {
    sign_list: BaseStrArrayDict
}

interface OrbitChartInterface
    extends BaseDateInterface, SignatureListInterface{
        changeTime: boolean
}

interface ChangeOrbitInterface{
    changeOrbit: boolean;
    changeCodOrbit: boolean;
    changeTime: boolean;
}

interface ChartOrbitInterface
    extends BaseDateInterface, ChangeOrbitInterface, SignatureListInterface{
}

export type {
    SignChartData,
    SignData,
    FilterInterface,
    SignatureListInterface,
    OrbitChartInterface,
    ChangeOrbitInterface,
    ChartOrbitInterface
}
