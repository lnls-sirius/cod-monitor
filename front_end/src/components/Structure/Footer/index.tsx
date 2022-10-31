import React from "react";

import { footer } from "../../../assets/text";
import * as S from './styled';

const Menu: React.FC = (): React.ReactElement => {
  // Display the footer of the page

  return (
    <S.FooterWrapper>
      {footer.text}
      <br/>
      {footer.verInfo}
    </S.FooterWrapper>
  );
};

export default Menu;
