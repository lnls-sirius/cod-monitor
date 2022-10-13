import BpmDispatcherImpl from "./impl";
import BpmDispatcher from "./interface";

const eventDispatch: BpmDispatcher = new BpmDispatcherImpl();
export default eventDispatch;
