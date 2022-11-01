import { OrbitData } from "../../assets/interfaces/types";

export function changeStates(state1: any, state2: any): Array<any>{
    let stateTemp = state2;
    state2 = state1;
    state1 = stateTemp;
    return [state1, state2];
}

export function objectExists(list: any, name: string): boolean{
    if (Object.keys(list).length === 0 || list[name] == undefined) {
      return false;
    }else{
      return true;
    }
}

export function reverseAxis(axis: string){
    if(axis == 'X'){
        return 'Y';
    }else{
        return 'X';
    }
}

export function getBpmName(name: string, axis: string): string {
    return name + ':Pos'+axis+'-Mon';
}

export function randomIdGen(list: {[key: string]: any}): string {
    let letters: string = 'AJRTFGSN46283';
    let randomId: string = '';
    for (let i = 0; i < 5; i++) {
        randomId += letters[Math.floor((Math.random() * 13))];
    }
    return randomId;
}

export function sortList(listToSort: Array<OrbitData>, elem: number): Array<OrbitData>{
    if(typeof listToSort[0][elem] === "string"){
        return listToSort.sort(
            (first: OrbitData, second: OrbitData) => {
                return String(first[elem]).localeCompare(String(second[elem]));
            }
        );
    }else if(typeof listToSort[0][elem] === "number"){
        return listToSort.sort(
            (first: OrbitData, second: OrbitData) => {
                return Math.abs(Number(first[elem])) - Math.abs(Number(second[elem]));
            }
        );
    }
    return listToSort;
}
