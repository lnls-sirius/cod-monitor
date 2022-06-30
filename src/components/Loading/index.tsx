import React from "react";
import { useSelector } from "react-redux";
import * as S from './styled';

interface LoadingAnimation{
  show: boolean
}

const Loading: React.FC<LoadingAnimation> = (props: any) => {

  function showAnimation(){
    if(props.show){
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
export default Loading;
