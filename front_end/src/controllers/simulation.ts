import axios from 'axios';
import { SignChartData, SignData } from '../assets/interfaces/orbit';

// Send a request to the backend
async function httpRequest(jsonurl: string): Promise<any>{
  return await axios
  .get(jsonurl, {
      timeout: 40000,
      method: "GET",
      headers : {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  })
  .then((res) => {
    return res.data;
  })
}


// Fetch the list with the information of the signatures
async function fetchSimulationData(start: Date, end: Date): Promise<SignData> {
    let jsonurl: string = '';
    const GET_DATA_URL = `${window.location.protocol}//cod-mon-api.lnls.br/sign_comp`;
    jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`;
    const res: Promise<SignData> = httpRequest(jsonurl);
    return res
}


function invert_signal_data(res: number[]): number[] {
  return res.map((val: number) => {
    return (val * -1);
  });
}


function invert_signal(res: SignChartData, sign_list: Array<string>): SignChartData {
  sign_list.map((element: string) => {
    if(element[0] !== "cod_rebuilt"){
      let elem_id: string = element[0] + element[1]
      let cur_signal = res[elem_id];

      if(element[4] === "true"){
        cur_signal[0] = invert_signal_data(cur_signal[0]);
      }
      if(element[5] === "true"){
        cur_signal[1] = invert_signal_data(cur_signal[1]);
      }
    }
  });
  return res
}


// Fetch the dictionary with the information of the CODX and CODY of the signatures
async function fetchSignatureOrbit(sign_list: Array<any>, start: Date, end: Date): Promise<SignChartData> {
  let jsonurl: string = '';
  let cod_normalized: boolean = false;
  const GET_DATA_URL = `${window.location.protocol}//cod-mon-api.lnls.br/sign_orbit`;

  jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`;

  jsonurl += `&data=`

  sign_list.map((elem_data: Array<any>)=>{
    if(elem_data!==sign_list[0]){
      jsonurl += `,`
    }
    if(elem_data[0] === 'cod_rebuilt'){
      jsonurl += elem_data[0]
      if(elem_data[1]){
        cod_normalized = true;
      }
    }else{
      jsonurl += elem_data[0] + '_' + elem_data[1] + '_' + elem_data[2];
    }
  })

  if(cod_normalized){
    jsonurl += "&norm=true"
  }

  let res: SignChartData = await httpRequest(jsonurl);
  return invert_signal(res, sign_list)
}

export {
  fetchSimulationData,
  fetchSignatureOrbit
}
