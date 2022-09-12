export interface GetDateInterface {
    date: Date
}

export interface SetDateInterface extends GetDateInterface {
    id: string
    type: string
    setDate: (type: string, date: Date, id?: string)=>void
}

export interface BaseDateInterface {
    start: Date
    end: Date
}

export interface TimeInformation extends BaseDateInterface, IntervalListInterface{
    intervalMode: number
    refDate: Date
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

export interface IntervalsInterface {
    [key: string]: Array<string>
}

export interface DictBaseDate {
    [key: string]: BaseDateInterface
}

export interface IntervalListInterface {
    interval_list: DictBaseDate
}
