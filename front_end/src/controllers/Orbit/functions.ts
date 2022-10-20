import { OrbitDispatcher } from "../../redux/dispatcher";
import { BaseMagnet } from "./interfaces";

export function setSignature(id: string, element_info: any, list: BaseMagnet){
    if (id != undefined){
      list[id] = element_info;
      OrbitDispatcher.setSignatureList(list);
    }
  }

  export function deleteSignature(id: string, list: BaseMagnet){
    delete list[id];
    OrbitDispatcher.setSignatureList(list);
  }
  
