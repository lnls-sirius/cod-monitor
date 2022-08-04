export default interface TimeDispatcherInterface{
    SetStartDate(date: Date): void;
    SetEndDate(date: Date): void;
    SetRefDate(date: Date): void;
    SetTimeMode(timeMode: number): void;
}
