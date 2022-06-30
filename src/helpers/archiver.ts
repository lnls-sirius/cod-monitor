import archInterface from "../data-access";

export async function getRefArchiver(name: string, refDate: Date){
    const interval = 100;
    const startDate = new Date(refDate.getTime() - interval);
    const endDate = new Date(refDate.getTime() + interval);
    return getArchiver(name, startDate, endDate);
}

export async function getArchiver(name: string, startDate: Date, endDate: Date){
    try {
      const res = await archInterface.fetchData(name, startDate, endDate);
      const { data } = res;
      return data;
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
}
