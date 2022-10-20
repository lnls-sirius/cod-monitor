import OrbitDispatcherImpl from "./impl";
import OrbitDispatcher from "./interface";

const eventDispatch: OrbitDispatcher = new OrbitDispatcherImpl();
export default eventDispatch;
