import React from "react";
import * as S from './styled';

//Edit change page with < title >

const Logo: React.FC = () => {

  return (
    <S.NavWrapper> 
      <S.GridEle container>
        <S.GridEle item xs={4} md={4} lg={4}>
          <S.PageLink to='/orbitDrift'>
            Orbit Drift
          </S.PageLink>
        </S.GridEle>
        <S.GridEle item xs={4} md={4} lg={4}>
          <S.PageLink to='/driftCause'>
            Drift Possible causes
          </S.PageLink>
        </S.GridEle>
        <S.GridEle item xs={4} md={4} lg={4}>
          <S.PageLink to='/orbitCorrection'>
            Orbit Correction
          </S.PageLink>
        </S.GridEle>
      </S.GridEle>
    </S.NavWrapper>
  );
};

export default Logo;
