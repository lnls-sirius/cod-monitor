export function getE(){
    let endS = sessionStorage.getItem('endDate');
    let endDate = new Date();
    if (endS!=null){
        endDate = new Date(endS);
    }
    return endDate;
}

export function setS(start: Date){
    sessionStorage.setItem('startDate', start.toString());
    return new Date(start);
}
