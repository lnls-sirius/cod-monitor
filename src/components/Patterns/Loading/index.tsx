import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ChangeInterface } from "../../../controllers/Patterns/interfaces";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {change_time} = state.time;
  const {change_bpm} = state.bpm;
  return {
    changeBpm: change_bpm,
    changeTime: change_time
  }
}

const Loading: React.FC<ChangeInterface> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(props.changeBpm || props.changeTime);
  }, [props.changeBpm, props.changeTime])

  function showAnimation(){
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
    return "";
  }

  return (
    <div>
      {showAnimation()}
    </div>
  );
};
export default connect(mapStateToProps)(Loading);
