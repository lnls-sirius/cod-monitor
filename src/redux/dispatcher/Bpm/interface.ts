export default interface BpmDispatcherInterface{
    setBpmList(list: string): void;
    setLedSetters(list: string): void;
    setChangeBpm(state: boolean): void;
}
