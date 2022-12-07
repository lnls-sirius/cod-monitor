import { OrbitDispatcher } from "../redux/dispatcher";
import { formatBPMName } from "./bpm";
import control from "./Modals";
import { pos } from "../assets/constants/pos";
import { BaseStrArrayDict } from "../assets/interfaces/patterns";


// Build the dataset for the orbit charts
function buildDatasetOrbit(dataList: any): Array<any>{
    return dataList.map((sign_data: any, idx: number) => {
        return {
        x: formatBPMName(pos[idx]),
        y: sign_data
        }
    });
}

// Add signature to the selected signature list
function setSignature(id: string, element_info: any, list: BaseStrArrayDict){
    if (id != undefined){
        list[id] = element_info;
        control.setAlert('Al_Add_Sign');
        OrbitDispatcher.setSignatureListInterface(list);
        OrbitDispatcher.setChangeOrbit(true);
    }
}

// Remove signature from the selected signature list
function deleteSignature(id: string, list: BaseStrArrayDict): void {
    delete list[id];
    control.setAlert('Al_Rem_Sign');
    OrbitDispatcher.setSignatureListInterface(list);
    OrbitDispatcher.setChangeOrbit(true);
}

// Toggle signature visibility
function visibleSignature(id: string, list: BaseStrArrayDict): void {
    let isVisible: boolean = (list[id][3] === 'true');
    list[id][3] = (!isVisible).toString();
    control.setAlert('Vis_Sign');
    OrbitDispatcher.setSignatureListInterface(list);
    OrbitDispatcher.setChangeOrbit(true);
}

// Remove change flag of Orbit
function unsetOrbitChange(): void {
  OrbitDispatcher.setChangeOrbit(false);
}

export {
    buildDatasetOrbit,
    setSignature,
    deleteSignature,
    visibleSignature,
    unsetOrbitChange
}