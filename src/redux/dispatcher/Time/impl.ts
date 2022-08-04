import store from "../../storage/store";
import { actions as actionsTime } from "../../features/TimeStore";
import TimeDispatcherInterface from "./interface";

class TimeDispatcherImpl implements TimeDispatcherInterface{
    SetStartDate(date: Date): void {
        store.dispatch(actionsTime.setStart(date.toString()));
    }

    SetEndDate(date: Date): void {
        store.dispatch(actionsTime.setEnd(date.toString()));
    }

    SetRefDate(date: Date): void {
        store.dispatch(actionsTime.setRef(date.toString()));
    }

    SetTimeMode(timeMode: number): void {
        store.dispatch(actionsTime.setTimeMode(timeMode));
    }
}

export default TimeDispatcherImpl;
