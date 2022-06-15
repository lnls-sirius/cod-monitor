import React from "react";
import DateInterval from "../../components/DateInterval";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Header';
import Logo from "../../components/Logo";
import Navigator from "../../components/Navigator";
import Item from "../../components/Item";
import Footer from "../../components/Footer";
import Interval from "../../components/Interval";
import ListBPM from "../../components/ListBPM";
import * as S from './styled';

const BpmDrift: React.FC = () => {
  const itemType = 2;
  return (
    <S.AppLayout>
      <Header>
        <S.HorizontalWrapper>
          <Logo />
          <S.VerticalWrapper>
            <S.HorizontalWrapper>
              <Interval />
            </S.HorizontalWrapper>
            <S.HorizontalWrapper>
              <Navigator />
              <Item title='ADD BPM' id='add_bpm' type={itemType}/>
              <DateInterval />
            </S.HorizontalWrapper>
          </S.VerticalWrapper>
        </S.HorizontalWrapper>
      </Header>
      <DiffChart/>
      <ListBPM />
      <Footer />
    </S.AppLayout>
  );
};
export default BpmDrift;
