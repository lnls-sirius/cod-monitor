import { BaseStrArrayDict } from "../../../controllers/Patterns/interfaces";

export default interface OrbitDispatcher{
    setChangeOrbit(change: boolean): void;
    setSignatureList(list: BaseStrArrayDict): void;
}
