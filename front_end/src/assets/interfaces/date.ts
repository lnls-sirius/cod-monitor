interface GetDateInterface {
    date: Date
}

interface SetDateInterface extends GetDateInterface {
    type: string
    setDate: (type: string, date: Date, id?: string)=>void
}

interface BaseDateInterface {
    start: Date
    end: Date
}

interface RefInterface {
    refDate: Date
    timeRef?: boolean
}

interface DateInfoInterface
    extends BaseDateInterface, RefInterface{
}

interface IntervalBtnsInterface
    extends BaseDateInterface {
        intervalMode: string
        intervalMil: number
}

interface DateIntervalInterface
    extends BaseDateInterface, RefInterface {
        intervalMode: string
}

interface TimeInformation
    extends BaseDateInterface{
        refDate: Date
        changeTime: boolean
}

interface IntervalEditInterface
    extends BaseDateInterface{
        id: string
}

interface IntervalModeInterface {
    [key: string]: {
        [key: string]: boolean
    }
}

export type {
    GetDateInterface,
    SetDateInterface,
    BaseDateInterface,
    RefInterface,
    DateInfoInterface,
    IntervalBtnsInterface,
    DateIntervalInterface,
    TimeInformation,
    IntervalEditInterface,
    IntervalModeInterface
}
