import { DataAccess } from "../assets/interfaces/data_access";
import ArchiverDataAccessFactory from "./factory";

const archInterface: DataAccess = ArchiverDataAccessFactory();
export default archInterface;
