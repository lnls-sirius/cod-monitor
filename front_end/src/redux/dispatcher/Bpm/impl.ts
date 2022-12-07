import BpmDispatcherInterface from "./interface";
import { actions as actionsBpm } from "../../features/BpmStore";
import { store } from "../../storage/store";

class BpmDispatcherImpl implements BpmDispatcherInterface{
    setBpmList(list: string): void{
        store.dispatch(actionsBpm.setSelected(list));
    }

    setChangeBpm(state: boolean): void {
        store.dispatch(actionsBpm.setChange(state));
    }
}

export default BpmDispatcherImpl;
