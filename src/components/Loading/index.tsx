import React from "react";
import * as S from './styled';

const Loading: React.FC<{progress: number}> = (props) => {
  return (
    <S.LoadingBar>
      <S.Progress
        progress={props.progress}/>
    </S.LoadingBar>
  );
};
export default Loading;
