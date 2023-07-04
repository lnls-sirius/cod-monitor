import { store } from "../../storage/store";
import { actions as actionsTime } from "../../features/TimeStore";
import TimeDispatcherInterface from "./interface";

class TimeDispatcherImpl implements TimeDispatcherInterface{
    setStartDate(date: Date): void {
        store.dispatch(actionsTime.setStart(date.toISOString()));
    }

    setEndDate(date: Date): void {
        store.dispatch(actionsTime.setEnd(date.toISOString()));
    }

    setRefDate(date: Date): void {
        store.dispatch(actionsTime.setRef(date.toISOString()));
    }

    setTimeMode(timeMode: string): void {
        store.dispatch(actionsTime.setTimeMode(timeMode));
    }

    setIntervalMilliseconds(time: number) {
        store.dispatch(actionsTime.setIntervalMilliseconds(time));
    }

    setChangeTime(state: boolean): void {
        store.dispatch(actionsTime.setChangeTime(state));
    }

}

export default TimeDispatcherImpl;
