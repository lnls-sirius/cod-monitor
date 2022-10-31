import { BaseStrArrayDict } from "../../../assets/interfaces/patterns";

export default interface OrbitDispatcher{
    setChangeOrbit(change: boolean): void;
    setSignatureList(list: BaseStrArrayDict): void;
}
