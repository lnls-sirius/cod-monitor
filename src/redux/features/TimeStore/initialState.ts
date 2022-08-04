export interface timeStore{
    time_mode: number,
    start_date: string,
    end_date: string,
    ref_date: string
}

const initialState: timeStore = {
    time_mode: 0,
    start_date: (new Date()).toString(),
    end_date: (new Date()).toString(),
    ref_date: (new Date()).toString()
}

export default initialState;
