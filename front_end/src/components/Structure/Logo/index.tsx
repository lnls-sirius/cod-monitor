import React from "react";

import labLogo1 from "../../../assets/img/labLogo1.png";
import labLogo2 from "../../../assets/img/labLogo2.png";
import * as S from './styled';

const Logo: React.FC = () => {
  return (
    <S.LogoWrapper>
      <S.ImageWrapper src={labLogo1} alt='CNPEM'/>
      <S.ImageWrapper src={labLogo2} alt='LNLS'/>
    </S.LogoWrapper>
  );
};
export default Logo;
