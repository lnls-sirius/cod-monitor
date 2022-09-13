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

export function getName(name: string, axis: string): string {
    return name + ':Pos'+axis+'-Mon';
}

export function randomIdGen(list: {[key: string]: any}): string {
    let letters = 'AJRTFGSN46283';
    let randomId = '';
    for (var i = 0; i < 5; i++) {
        randomId += letters[Math.floor((Math.random() * 13))];
    }
    return randomId;
}
