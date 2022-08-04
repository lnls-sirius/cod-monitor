import React from "react";
import { footer } from "../../../assets/text";
import * as S from './styled';

const Menu: React.FC = (): JSX.Element => {
  return (
    <S.FooterWrapper>
      {footer.text}
      <br/>
      {footer.verInfo}
    </S.FooterWrapper>
  );
};

export default Menu;
