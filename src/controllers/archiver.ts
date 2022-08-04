import archInterface from "../data-access";

export async function getRefArchiver(name: string, refDate: Date){
    const interval = 1000;
    const startDate = new Date(refDate.getTime() - interval);
    const endDate = new Date(refDate.getTime() + interval);
    return getArchiver(name, startDate, endDate, 1);
}

export async function getArchiver(name: string, startDate: Date, endDate: Date, optimization: number){
    try {
      const res = await archInterface.fetchData(
        name, startDate, endDate, optimization);
      const { data } = res;
      data.shift();
      return data;
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
}
