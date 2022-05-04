import React from "react";
import DateInterval from "../DateInterval";

import Logo from '../Logo'
import Navigator from '../Navigator'
import SideBar from "../SideBar";
import * as S from './styled';

const Header: React.FC = () => {
  return (
    <S.HeaderWrapper>
      <Logo />
      {/* <SideBar /> */}
      <Navigator />
      <DateInterval />
    </S.HeaderWrapper>
  );
};
export default Header;
