function startOutOfRange(start: Date){
    const now = new Date();
    const end = new Date(getEndDate());
    if(start.getTime() > end.getTime() ||
        start.getTime() > now.getTime()){
        return false;
    }
    return true;
}

function endOutOfRange(end: Date){
    const now = new Date();
    const start = new Date(getStartDate());
    if(end.getTime() < start.getTime() ||
        end.getTime() > now.getTime()){
        return false;
    }
    return true;
}

export function getStartDate(){
    const startS = sessionStorage.getItem('startDate');
    let startDate = new Date();
    if (startS!=null){
        startDate = new Date(startS);
    }
    return startDate;
}

export function getEndDate(){
    let endS = sessionStorage.getItem('endDate');
    let endDate = new Date();
    if (endS!=null){
        endDate = new Date(endS);
    }
    return endDate;
}

export function setStartDate(start: Date){
    if(startOutOfRange(start)){
        sessionStorage.setItem('startDate', start.toString());
    }
    return new Date(start);
}

export function setEndDate(end: Date){
    if(endOutOfRange(end)){
        sessionStorage.setItem('endDate', end.toString());
    }
    return new Date(end);
}
