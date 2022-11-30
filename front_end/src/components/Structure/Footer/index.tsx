import React from "react";

import { version } from "../../../assets/constants/text";
import * as S from './styled';

const Menu: React.FC = (): React.ReactElement => {
  // Display the footer of the page

  return (
    <S.FooterWrapper>
      For further information, contact FAC.
      <br/>
      {version}
    </S.FooterWrapper>
  );
};

export default Menu;
