import axios from 'axios';
import { SimulationData } from '../assets/interfaces/orbit';

// Send a request to the backend
async function httpRequest(jsonurl: string): Promise<SimulationData>{
  return await axios
  .get(jsonurl, {
      timeout: 5000,
      method: "GET",
      headers : {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': 'false'
      },
  })
  .then((res) => {
    console.log("Worked")
    return res.data;
  })
  .catch(error => {
    console.log(error);
  })
}


// Fetch the list with the information of the signatures
export async function fetchSimulationData(start: Date, end: Date): Promise<SimulationData> {
    let jsonurl: string = '';
    const GET_DATA_URL = `${window.location.protocol}//10.20.21.52:8080/sign_comp`;
    jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`;
    const res: Promise<SimulationData> = httpRequest(jsonurl);
    return res
}


// Fetch the dictionary with the information of the CODX and CODY of the signatures
export async function fetchSignatureOrbit(sign_list: Array<any>, start: Date, end: Date): Promise<SimulationData> {
  let jsonurl: string = '';
  const GET_DATA_URL = `${window.location.protocol}//10.20.21.52:8080/sign_orbit`;

  jsonurl = `${GET_DATA_URL}?start=${start.toJSON()}&stop=${end.toJSON()}`;

  jsonurl += `&data=`

  sign_list.map((elem_data: Array<any>)=>{
    if(elem_data!=sign_list[0]){
      jsonurl += `,`
    }
    if(elem_data[0] == 'cod_rebuilt'){
      jsonurl += elem_data[0]
    }else{
      jsonurl += elem_data[0] + '_' + elem_data[1] + '_' + elem_data[2];
    }
  })

  const res: Promise<SimulationData> = httpRequest(jsonurl);
  return res
}
