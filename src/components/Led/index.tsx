import React, { useState } from "react";
import styled from "styled-components";
import * as S from './styled';

const Led: React.FC = () => {
    const [state, setState] = useState(true);
    
    let led = state ? "greenLed" : "purpleLed";
  
    function changeColor(){
      setState(!state)
    }

  return(
    <S.LedWrapper 
      onClick={changeColor.bind(this)}
      ledState={state}/>
  );
};

export default Led;
