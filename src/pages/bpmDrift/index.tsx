import React from "react";
import DateInterval from "../../components/Date/DateInterval";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Structure/Header';
import Logo from "../../components/Structure/Logo";
import Navigator from "../../components/Structure/Navigator";
import Item from "../../components/Patterns/Item";
import Footer from "../../components/Structure/Footer";
import Interval from "../../components/Date/Interval";
import ListBPM from "../../components/ListBPM";
import AddBPM from "../../components/AddBPM";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import * as S from './styled';

const BpmComp = () => <AddBPM />;

const BpmDrift: React.FC = () => {
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
              <Item
                title='ADD BPM'
                component={<BpmComp />}
                icon={faListCheck}/>
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
