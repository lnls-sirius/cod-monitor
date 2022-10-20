import { BaseMagnet } from "../../../controllers/Orbit/interfaces";

export default interface OrbitDispatcher{
    setChangeOrbit(change: boolean): void;
    setSignatureList(list: BaseMagnet): void;
}
