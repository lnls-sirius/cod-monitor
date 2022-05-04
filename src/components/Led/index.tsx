import React, { useEffect, useState } from "react";
import * as S from './styled';

interface onMount{
  id: string;
  mountData: (data: any)=>void;
}

const Led: React.FC<onMount> = (props) => {
  const [state, setState] = useState(false);

  function setPV(){
    setState(!state);
  }

  useEffect(() => {
    props.mountData([state, setState, props.id]);
  }, [props.mountData, state]);

  return(
    <S.LedWrapper
      onClick={setPV.bind(this)}
      ledState={state}/>
  );
};

export default Led;
