export interface TimeOptions {
    id?: string;
    date: Date;
}

export interface TimeInformation {
    intervalMode: number,
    startDate: Date,
    endDate: Date,
    refDate: Date
}

export interface IntervalModeInterface {
    [key: string]: {
        [key: number]: boolean
    }
}

export interface IntervalsInterface {
    [key: string]: Array<string>
}
