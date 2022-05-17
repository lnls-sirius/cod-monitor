import React from "react";
import DateInterval from "../../components/DateInterval";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Header';
import Logo from "../../components/Logo";
import Navigator from "../../components/Navigator";
import * as S from './styled';
import Item from "../../components/Item";
import Footer from "../../components/Footer";

const BpmDrift: React.FC = () => {
  const itemType = 2;

  return (
    <S.AppLayout>
      <Header>
        <S.HeaderWrapper>
          <Logo />
          <Navigator />
          <Item title='ADD BPM' id='add_bpm' type={itemType}/>
          <DateInterval />
        </S.HeaderWrapper>
      </Header>
      <DiffChart/>
      <Footer />
    </S.AppLayout>
  );
};
export default BpmDrift;
