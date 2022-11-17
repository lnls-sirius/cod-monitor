import { BaseDateInterface } from "./date"
import { BaseStrArrayDict, DictState } from "./patterns"
import { DispatchDictState, DispatchString, DictOrbitData } from "./types"

export interface SimulationData {
    [key: string]: DictOrbitData
}

export interface FilterInterface {
    setGlobExp: DispatchString,
    filterState: DictState,
    setFilterStates: DispatchDictState
}

export interface SignatureListInterface {
    sign_list: BaseStrArrayDict
}

export interface OrbitChartInterface
    extends BaseDateInterface, SignatureListInterface{
        changeTime: boolean
}

export interface ChangeOrbitInterface{
    changeOrbit: boolean;
    changeTime: boolean;
}

export interface ChartOrbitInterface
    extends BaseDateInterface, ChangeOrbitInterface, SignatureListInterface{
}
