import React from "react";

import Logo from "../Logo";
import Navigator from "../Navigator";
import { ChildrenInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: ChildrenInterface = {
  children: null
}

const Header: React.FC<ChildrenInterface> = ({children}) => {
  // Display the header pattern on the pages
  return (
    <S.HeaderWrapper>
      <Logo />
      <Navigator />
      {children}
    </S.HeaderWrapper>
  );
};

Header.defaultProps = defaultProps;
export default Header;
