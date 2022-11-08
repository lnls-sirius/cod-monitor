import React from "react";

import DateInterval from "../../components/Date/DateInterval";
import DiffChart from "../../components/BPM/DiffChart";
import Header from '../../components/Structure/Header';
import Item from "../../components/Patterns/Item";
import Footer from "../../components/Structure/Footer";
import Interval from "../../components/Date/Interval";
import Modals from "../../components/Patterns/Modals";
import ListBPM from "../../components/BPM/ListBPM";
import Loading from "../../components/Patterns/Loading";
import control from "../../controllers/Modals";
import { modalInfo } from "../../assets/constants/patterns";
import * as S from './styled';

const BpmDrift: React.FC = () => {
  // Display the BPM Drift Interface

  return (
    <S.AppLayout>
      <Modals/>
      <Loading/>
      <Header>
        <S.VerticalWrapper>
          <S.HorizontalWrapper>
            <Interval/>
          </S.HorizontalWrapper>
          <S.HorizontalWrapper>
            <Item
              icon={modalInfo['BPM'].icon}
              action={()=>control.setActionModal('BPM')}/>
            <DateInterval timeRef={true}/>
          </S.HorizontalWrapper>
        </S.VerticalWrapper>
      </Header>
      <DiffChart/>
      <ListBPM />
      <Footer />
    </S.AppLayout>
  );
};
export default BpmDrift;
