import React from "react";
import Logo from "../Logo";
import Navigator from "../Navigator";
import * as S from './styled';

type Props = {
  children?: React.ReactElement;
}

const Header: React.FC<Props> = ({children}) => {
  return (
    <S.HeaderWrapper>
      <Logo />
      <Navigator />
      {children}
    </S.HeaderWrapper>
  );
};
export default Header;
