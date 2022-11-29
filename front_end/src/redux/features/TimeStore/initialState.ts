import { getTimeMilliseconds } from "../../../controllers/time";

const current = new Date();
const ref = current.getTime() - 5000;

export interface timeStore{
    time_mode: string,
    start_date: string,
    end_date: string,
    ref_date: string,
    interval_mil: number,
    change_time: boolean
}

const initialState: timeStore = {
    time_mode: 'End',
    start_date: current.toString(),
    end_date: current.toString(),
    ref_date: (new Date(ref)).toString(),
    change_time: false,
    interval_mil: getTimeMilliseconds("Hour")
}

export default initialState;
