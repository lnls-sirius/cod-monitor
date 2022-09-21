import archInterface from "../data-access";

export async function getRefArchiver(name: string, refDate: Date){
    const now = new Date();
    const interval = 1000;
    const start = new Date(refDate.getTime() - interval);
    const endTime = refDate.getTime() + interval;
    let end = now;
    if (endTime < now.getTime()){
      end = new Date(endTime);
    }
    return getArchiver(name, start, end, 1);
}

export async function getArchiver(name: string, start: Date, end: Date, optimization: number){
    try {
      const res = await archInterface.fetchData(
        name, start, end, optimization);
      const { data } = res;
      data.shift();
      return data;
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
}
