import { getTimeMilliseconds } from "../../../controllers/Time/functions";

export interface timeStore{
    time_mode: number,
    start_date: string,
    end_date: string,
    ref_date: string,
    interval_mil: number,
    change_time: boolean,
    date_list: string
}

const initialState: timeStore = {
    time_mode: 0,
    start_date: (new Date()).toString(),
    end_date: (new Date()).toString(),
    ref_date: (new Date()).toString(),
    change_time: false,
    interval_mil: getTimeMilliseconds("Hour"),
    date_list: "{}"
}

export default initialState;
