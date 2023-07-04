import axios from 'axios';
import { DataAccess, ArchiverData, ArchiverDataPoint } from "../assets/interfaces/data_access";

export const ipRegExp = /https?\/((?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])))\//;
export const defaultHost = "10.0.38.42";

export class ArchiverDataAccess implements DataAccess{

  host: string;
  private url: string;
  private GET_DATA_URL: string;

  constructor() {
    this.host = defaultHost;
    this.url = this.getUrl();
    this.GET_DATA_URL = `${window.location.protocol}//${this.url}/retrieval/data/getData.json`;
  }

  // Parse a point dictionary from the values read in Archiver
  private parseData(data: any[]): ArchiverDataPoint[] {
    const outData: ArchiverDataPoint[] = [];
    data.forEach(({ val, secs, nanos}) => {
      let y: any;
      if (val instanceof Array) {
        const [avg] = val;
        y = avg;
      } else {
        y = val;
      }

      const x = new Date(secs * 1e3 + nanos * 1e-6);
      if (!isNaN(x.getTime())) {
        outData.push({
          x,
          y
        });
      }
    });
    return outData;
  }

  // Fetch several PVs at one fixed time
  async fetchPointPV(pvname: string, date: Date): Promise<ArchiverDataPoint[]> {
    const now: Date = new Date();
    const interval: number = 1000;
    let dates: Date[] = [];

    let mil_date = date.getTime();
    if(mil_date >= (now.getTime()-interval)){
      dates[0] = new Date(mil_date-interval);
      dates[1] = now;
    }else{
      dates[0] = new Date(mil_date-interval);
      dates[1] = new Date(mil_date+interval);
    }
    const res = await this.fetchData(
      pvname, dates[0], dates[1], 800);
    return res.data;
  }

  // Fetch PV data in an interval
  async fetchData(pv: string, from: Date, to: Date, optimization: number): Promise<ArchiverData> {
    let jsonurl: string = '';
    let finalData: Array<ArchiverDataPoint> = [];
    let pvValue: string = '';
    this.GET_DATA_URL = `${window.location.protocol}//${this.url}/retrieval/data/getData.json`;

    const timeDifference = to.getTime() - from.getTime();

    pvValue = optimization < (timeDifference/optimization)?
      `optimized_`+optimization+`(${pv})`:pv;

    jsonurl = `${this.GET_DATA_URL}?pv=`+pvValue+`&from=${from.toJSON()}&to=${to.toJSON()}`
    const res = await axios
    .get(jsonurl, {
      timeout: 0,
      method: "GET",
      responseType: "text",
      transformResponse: (res) => {
        if (res.includes("Bad Request")) {
          throw `Invalid response from ${jsonurl}`;
        }
        let data: string = res.replace(/(-?Infinity)/g, '"$1"');
        data = data.replace(/(NaN)/g, '"$1"');
        data = JSON.parse(data);
        return data;
      },
    })
    .then((res) => {
      return res.data[0];
    });
    finalData = this.parseData(res.data);

    return {
      meta: res.meta,
      data: finalData
    };
  }

  // Fetch the URL
  getUrl(): string {
    return defaultHost;
  }
}
