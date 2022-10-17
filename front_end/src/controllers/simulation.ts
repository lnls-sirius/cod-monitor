import axios from 'axios';

// export const ipRegExp = /https?\/((?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])))\//;
export const defaultHost = "127.0.0.1";

export interface SimulationData {
    [key: string]: [
        string, number, number
    ]
}

export async function fetchSimulationData(start: Date, end: Date): Promise<SimulationData> {
    let jsonurl = '';
    const GET_DATA_URL = `${window.location.protocol}//127.0.0.1:8081/sign_comp`;

    jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`
    const res = await axios
    .get(jsonurl, {
        timeout: 0,
        method: "GET",
        headers : {
          'Content-Type':'application/json'
        },
    })
    .then((res) => {
      return res.data;
    });

    return res
}
