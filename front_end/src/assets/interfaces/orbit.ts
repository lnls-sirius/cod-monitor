import { BaseDateInterface } from "./date"
import { BaseStrArrayDict, DictState } from "./patterns"
import { DispatchDictState, DispatchString, DictOrbitData } from "./types"

interface SimulationData {
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
    changeTime: boolean;
}

interface ChartOrbitInterface
    extends BaseDateInterface, ChangeOrbitInterface, SignatureListInterface{
}

export type {
    SimulationData,
    FilterInterface,
    SignatureListInterface,
    OrbitChartInterface,
    ChangeOrbitInterface,
    ChartOrbitInterface
}
