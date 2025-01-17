import { BaseStrArrayDict } from "../../../assets/interfaces/patterns";

export default interface OrbitDispatcher{
    setChangeOrbit(change: boolean): void;
    setChangeCodOrbit(change: boolean): void;
    setSignatureListInterface(list: BaseStrArrayDict): void;
}
