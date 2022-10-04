import axios from 'axios';
import { DataAccess, ArchiverData, ArchiverDataPoint, ArchiverListRaw, ArchiverList} from "./interface";

export const ipRegExp = /https?\/((?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])))\//;
export const defaultHost = "10.0.38.46";

export class ArchiverDataAccess implements DataAccess{

  host: string;
  private url: string;
  private GET_DATA_URL: string;

  constructor() {
    this.host = defaultHost;
    this.url = this.getUrl();
    this.GET_DATA_URL = `${window.location.protocol}//${this.url}/retrieval/data/getData.json`;
  }

  private parseData(data: any[]): ArchiverDataPoint[] {
    const outData: ArchiverDataPoint[] = [];
    data.forEach(({ val, secs, nanos}) => {
      let y;
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

  private parseDataList(data: ArchiverListRaw): ArchiverList {
    const outData: ArchiverList = {};
    Object.entries(data).map(([name, info]: any) => {
      outData[name] = info.val;
    })
    return outData;
  }

  async fetchSeveralPV(pvList: Array<string>, date: Date): Promise<ArchiverList> {
    let jsonurl = '';
    let finalData = null;
    this.GET_DATA_URL = `${window.location.protocol}//${this.url}/retrieval/data/getDataAtTime`;
    jsonurl = `${this.GET_DATA_URL}?at=`+date.toJSON()

    const res = await axios.post(jsonurl,
      pvList,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    )
    
    finalData = this.parseDataList(res.data);
  
    return finalData;
  }

  async fetchData(pv: string, from: Date, to: Date, optimization: number): Promise<ArchiverData> {
    let jsonurl = '';
    let finalData = null;
    let pvValue = '';
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
        let data = res.replace(/(-?Infinity)/g, '"$1"');
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

  getUrl(): string {
    if (window.location.host === "vpn.cnpem.br") {
      // If using WEB VPN
      // Capture IPv4 address
      const match = ipRegExp.exec(window.location.href);
      if (match && match.length > 1) {
        this.host = match[1];
      }
    } else {
      this.host = window.location.host.indexOf(":") !== -1 ? window.location.host.split(":")[0] : window.location.host;
    }

    if (window.location.host === "localhost:3000" || window.location.host === "127.0.0.1:3000") {
      this.host = defaultHost;
      console.log(`DEBUG SERVER. Setting host to ${this.host}`);
    }
    return this.host;
  }
}
