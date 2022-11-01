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

export interface SignatureList {
    sign_list: BaseStrArrayDict
}

export interface OrbitChartInterface
    extends BaseDateInterface, SignatureList{
}
