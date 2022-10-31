export interface GetDateInterface {
    date: Date
}

export interface SetDateInterface extends GetDateInterface {
    type: string
    setDate: (type: string, date: Date, id?: string)=>void
}

export interface BaseDateInterface {
    start: Date
    end: Date
}

export interface RefInterface {
    refDate: Date
    timeRef?: boolean
}

export interface DateInfoInterface
    extends BaseDateInterface, RefInterface{
}


export interface IntervalBtnsInterface
    extends BaseDateInterface {
        intervalMode: number
        intervalMil: number
}

export interface DateIntervalInterface
    extends BaseDateInterface, RefInterface {
        intervalMode: number
}

export interface TimeInformation
    extends BaseDateInterface, IntervalListInterface{
        refDate: Date
        intervalMode: number
        changeTime: boolean
}

export interface IntervalEditInterface extends BaseDateInterface, IntervalListInterface{
    id: string
}

export interface IntervalModeInterface {
    [key: string]: {
        [key: number]: boolean
    }
}

export interface DictBaseDate {
    [key: string]: BaseDateInterface
}

export interface IntervalListInterface {
    interval_list: DictBaseDate
}
