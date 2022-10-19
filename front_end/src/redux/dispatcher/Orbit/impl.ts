import store from "../../storage/store";
import { actions as actionsOrbit } from "../../features/OrbitStore";
import OrbitDispatcherInterface from "./interface";
import { DictOrbit } from "../../../controllers/Orbit/interfaces";

class OrbitDispatcherImpl implements OrbitDispatcherInterface{
    setSignatureList(list: DictOrbit): void {
        store.dispatch(actionsOrbit.setSignatureList(JSON.stringify(list)));
    }

}

export default OrbitDispatcherImpl;
