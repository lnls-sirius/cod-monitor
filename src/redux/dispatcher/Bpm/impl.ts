import BpmDispatcherInterface from "./interface";
import { actions as actionsBpm } from "../../features/BpmStore";
import store from "../../storage/store";

class BpmDispatcherImpl implements BpmDispatcherInterface{
    setBpmList(list: string): void{
        store.dispatch(actionsBpm.setSelectBpm(list));
    }

    setColorsList(list: string): void{
        store.dispatch(actionsBpm.setColorsBpm(list));
    }
}

export default BpmDispatcherImpl;
