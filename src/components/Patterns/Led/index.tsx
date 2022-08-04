import React, { useEffect, useState } from "react";
import * as S from './styled';

interface onMount{
  id: string;
  initState: boolean;
  mountData: (data: object)=>void;
}

const Led: React.FC<onMount> = (props) => {
  // Led Component that toggles its state when clicked

  const [state, setState] = useState(props.initState);

  useEffect(() => {
    props.mountData([state, setState, props.id]);
  }, [props.mountData, state]);

  function setBPM(): void{
    setState(!state);
  }

  return(
    <S.LedWrapper
      onClick={setBPM.bind(this)}
      state={state}/>
  );
};

export default Led;
