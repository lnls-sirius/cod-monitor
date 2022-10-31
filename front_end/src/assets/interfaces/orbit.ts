import { BaseStrArrayDict, DictState } from "./patterns"
import { DispatchDictState, DispatchString } from "./types"

export interface SimulationData {
    [key: string]: [
        string, number, number
    ]
}

export interface FilterInterface {
    setGlobExp: DispatchString,
    filterState: DictState,
    setFilterStates: DispatchDictState
}

export interface SignatureList {
    sign_list: BaseStrArrayDict
}
