import { store } from "../../storage/store";
import { actions as actionsOrbit } from "../../features/OrbitStore";
import OrbitDispatcherInterface from "./interface";
import { BaseStrArrayDict } from "../../../assets/interfaces/patterns";

class OrbitDispatcherImpl implements OrbitDispatcherInterface{

    setChangeOrbit(change: boolean): void {
        store.dispatch(actionsOrbit.setChange(change));
    }

    setSignatureListInterface(list: BaseStrArrayDict): void {
        store.dispatch(actionsOrbit.setSignatureListInterface(JSON.stringify(list)));
    }

}

export default OrbitDispatcherImpl;
