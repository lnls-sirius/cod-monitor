import store from "../../storage/store";
import { actions as actionsOrbit } from "../../features/OrbitStore";
import OrbitDispatcherInterface from "./interface";
import { BaseStrArrayDict } from "../../../controllers/Patterns/interfaces";

class OrbitDispatcherImpl implements OrbitDispatcherInterface{

    setChangeOrbit(change: boolean): void {
        store.dispatch(actionsOrbit.setChange(change));
    }

    setSignatureList(list: BaseStrArrayDict): void {
        store.dispatch(actionsOrbit.setSignatureList(JSON.stringify(list)));
    }

}

export default OrbitDispatcherImpl;
