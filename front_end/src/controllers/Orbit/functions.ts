import { OrbitDispatcher } from "../../redux/dispatcher";
import { BaseStrArrayDict } from "../Patterns/interfaces";

export function setSignature(id: string, element_info: any, list: BaseStrArrayDict){
    if (id != undefined){
      list[id] = element_info;
      OrbitDispatcher.setSignatureList(list);
    }
  }

  export function deleteSignature(id: string, list: BaseStrArrayDict){
    delete list[id];
    OrbitDispatcher.setSignatureList(list);
  }
