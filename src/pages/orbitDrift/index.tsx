import React from "react";
import DateInterval from "../../components/DateInterval";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Header';
import Logo from "../../components/Logo";
import SideBar from "../../components/SideBar";
import Navigator from "../../components/Navigator";
import * as S from './styled';

const OrbitDrift: React.FC = () => {
  return (
    <S.AppLayout>
      <Header>
        <S.HeaderWrapper>
          <Logo />
          {/* <SideBar /> */}
          <Navigator />
          <DateInterval />
        </S.HeaderWrapper>
      </Header>
      <DiffChart
        chartData={[1,3,5,6,2,6]}/>
    </S.AppLayout>
  );
};
export default OrbitDrift;
