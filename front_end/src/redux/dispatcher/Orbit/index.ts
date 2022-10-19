import TimeDispatcherImpl from "./impl";
import TimeDispatcher from "./interface";

const eventDispatch: TimeDispatcher = new TimeDispatcherImpl();
export default eventDispatch;
