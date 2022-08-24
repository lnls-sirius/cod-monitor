import React, { useEffect, useState } from "react";
import { OnMount } from "../../../controllers/Patterns/interfaces";
import * as S from './styled';

const Led: React.FC<OnMount> = (props) => {
  // Led Component that toggles its state when clicked
  const [state, setState] = useState<boolean>(props.initState);

  useEffect(() => {
    props.mountData(setState, props.id);
  }, []);

  useEffect(() => {
    props.updateData(state, props.id);
  }, [props.updateData, state]);

  function setBPM(): void {
    setState(!state);
  }

  return(
    <S.LedWrapper
      key={props.id}
      onClick={setBPM.bind(this)}
      state={state}/>
  );
};

export default Led;
