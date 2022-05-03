import { posix } from "path";
import React, { useEffect } from "react";

const AddPV: React.FC = () => {
  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }
  useEffect(()=>{
    getData()
  },[])
  
  return(
    <div>Teste</div>
  );
};

export default AddPV;
