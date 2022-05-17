import React from "react";
import DateInterval from "../../components/DateInterval";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Header';
import Logo from "../../components/Logo";
import SideBar from "../../components/SideBar";
import Navigator from "../../components/Navigator";
import * as S from './styled';
import Item from "../../components/Item";

const BpmDrift: React.FC = () => {
  return (
    <S.AppLayout>
      <Header>
        <S.HeaderWrapper>
          <Logo />
          <Navigator />
          <Item title='Add BPM' action={1}/>
          <Item title='Start Date' action={2}/>
          <Item title='End Date' action={3}/>
          <DateInterval />
        </S.HeaderWrapper>
      </Header>
      <DiffChart/>
    </S.AppLayout>
  );
};
export default BpmDrift;
