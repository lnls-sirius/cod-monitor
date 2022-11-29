export default interface TimeDispatcherInterface{
    setStartDate(date: Date): void;
    setEndDate(date: Date): void;
    setRefDate(date: Date): void;
    setTimeMode(timeMode: string): void;
    setIntervalMilliseconds(time: number): void;
    setChangeTime(state: boolean): void;
}
