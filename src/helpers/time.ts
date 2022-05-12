export function outOfRange(start: Date, end: Date){
    const now = new Date();
    if(start.getTime() > end.getTime() ||
        end.getTime() < start.getTime() ||
        start.getTime() > now.getTime() ||
        end.getTime() > now.getTime()){
        return false;
    }else{
        return true;
    }
}
