import React, { useEffect, useState } from "react";
import * as S from './styled';

interface onMount{
  id: string;
  initState: boolean;
  mountData: (data: any)=>void;
}

const Led: React.FC<onMount> = (props) => {
  const [state, setState] = useState(props.initState);

  function setBPM(){
    setState(!state);
  }

  useEffect(() => {
    props.mountData([state, setState, props.id]);
  }, [props.mountData, state]);

  return(
    <S.LedWrapper
      onClick={setBPM.bind(this)}
      ledState={state}/>
  );
};

export default Led;