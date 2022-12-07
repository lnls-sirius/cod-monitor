import { DataAccessFactory } from "../assets/interfaces/data_access";
import { ArchiverDataAccess } from "./impl";

const ArchiverDataAccessFactory: DataAccessFactory = () => {
  return new ArchiverDataAccess();
};
export default ArchiverDataAccessFactory;
