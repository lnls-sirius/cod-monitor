import store from "../../storage/store";
import { actions as actionsTime } from "../../features/TimeStore";
import TimeDispatcherInterface from "./interface";

class TimeDispatcherImpl implements TimeDispatcherInterface{
    setStartDate(date: Date): void {
        store.dispatch(actionsTime.setStart(date.toString()));
    }

    setEndDate(date: Date): void {
        store.dispatch(actionsTime.setEnd(date.toString()));
    }

    setRefDate(date: Date): void {
        store.dispatch(actionsTime.setRef(date.toString()));
    }

    setTimeMode(timeMode: number): void {
        store.dispatch(actionsTime.setTimeMode(timeMode));
    }

    setChangeTime(state: boolean): void {
        store.dispatch(actionsTime.setChangeTime(state));
    }
}

export default TimeDispatcherImpl;
