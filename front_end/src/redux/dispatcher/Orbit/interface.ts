import { DictOrbit } from "../../../controllers/Orbit/interfaces";

export default interface OrbitDispatcherInterface{
    setSignatureList(list: DictOrbit): void;
}
