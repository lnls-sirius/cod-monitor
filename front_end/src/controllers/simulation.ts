import axios from 'axios';
import { SimulationData } from '../assets/interfaces/orbit';

// export const ipRegExp = /https?\/((?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])))\//;
export const defaultHost = "127.0.0.1";

// Send a request to the backend
async function httpRequest(jsonurl: string): Promise<SimulationData>{
  return await axios
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
}


// Fetch the list with the information of the signatures
export async function fetchSimulationData(start: Date, end: Date): Promise<SimulationData> {
    let jsonurl: string = '';
    const GET_DATA_URL = `${window.location.protocol}//127.0.0.1:8080/sign_comp`;
    jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`;
    const res: Promise<SimulationData> = httpRequest(jsonurl);
    return res
}


// Fetch the dictionary with the information of the CODX and CODY of the signatures
export async function fetchSignatureOrbit(sign_list: Array<any>, start: Date, end: Date): Promise<SimulationData> {
  let jsonurl: string = '';
  const GET_DATA_URL = `${window.location.protocol}//127.0.0.1:8080/sign_orbit`;

  jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`;

  jsonurl += `&data=`
  if(sign_list.length == 0){
    jsonurl += 'cod_rebuilt'
  }else{
    sign_list.map((elem_data: Array<any>)=>{
      if(elem_data!=sign_list[0]){
        jsonurl += `,`
      }
      jsonurl += elem_data[0] + '_' + elem_data[1] + '_' + elem_data[2];
    })
  }

  const res: Promise<SimulationData> = httpRequest(jsonurl);
  return res
}
