export default interface TimeDispatcherInterface{
    setStartDate(date: Date): void;
    setEndDate(date: Date): void;
    setRefDate(date: Date): void;
    setTimeMode(timeMode: number): void;
    setChangeTime(state: boolean): void;
}
