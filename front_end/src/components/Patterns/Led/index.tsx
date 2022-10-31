import React, { useEffect, useState } from "react";

import { OnMount } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: OnMount = {
  id: '0',
  state: false,
  mountData: () => null,
  updateData: () => null
}

const Led: React.FC<OnMount> = (props) => {
  // Led Component that toggles its state when clicked
  const [state, setState] = useState<boolean>(props.state);

  // Initialize Led Component
  useEffect(() => {
    props.mountData(setState, props.id);
  }, []);

  // Update Led State
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

Led.defaultProps = defaultProps;
export default Led;
