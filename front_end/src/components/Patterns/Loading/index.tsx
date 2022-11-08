import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { ChangeInterface } from "../../../assets/interfaces/patterns";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {change_time} = state.time;
  const {change_bpm} = state.bpm;
  const {change_orbit} = state.orbit;

  return {
    changeBpm: change_bpm,
    changeTime: change_time,
    changeOrbit: change_orbit
  }
}

const defaultProps: ChangeInterface = {
  changeBpm: false,
  changeTime: false,
  changeOrbit: false
}

const Loading: React.FC<ChangeInterface> = (props) => {
  // Display Loading Animation
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, [])

  // Set animation if any change flag is detected as true
  useEffect(() => {
    setLoading(props.changeBpm || props.changeTime || props.changeOrbit);
  }, [props.changeBpm, props.changeTime, props.changeOrbit])

  function showAnimation(): React.ReactElement {
    if(loading){
      return (
        <S.LoadingWrapper>
          <S.Circle
            delay="0s"/>
          <S.Circle
            delay="0.25s"/>
          <S.Circle
            delay="0.5s"/>
          <S.Circle
            delay="0.75s"/>
        </S.LoadingWrapper>
      );
    }
    return <div/>;
  }

  return (
    <div>
      {showAnimation()}
    </div>
  );
};

Loading.defaultProps = defaultProps;
export default connect(mapStateToProps)(Loading);
