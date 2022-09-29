import { getTimeMilliseconds } from "../../../controllers/Time/functions";

const current = new Date();
const ref = current.getTime() - 5000;

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
    start_date: current.toString(),
    end_date: current.toString(),
    ref_date: (new Date(ref)).toString(),
    change_time: false,
    interval_mil: getTimeMilliseconds("Hour"),
    date_list: "{}"
}

export default initialState;
