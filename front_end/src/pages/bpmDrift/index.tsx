import React from "react";

import DateInterval from "../../components/Date/DateInterval";
import DiffChart from "../../components/BPM/DiffChart";
import Header from '../../components/Structure/Header';
import Item from "../../components/Patterns/Item";
import Footer from "../../components/Structure/Footer";
import Interval from "../../components/Date/Interval";
import Modals from "../../components/Patterns/Modals";
import Loading from "../../components/Patterns/Loading";
import control from "../../controllers/Modals";
import { modalInfo } from "../../assets/constants/patterns";
import * as S from './styled';

const BpmDrift: React.FC = () => {
  // Display the BPM Drift Interface

  return (
    <S.AppLayout>
      <Loading/>
      <Modals/>
      <Header>      
        <S.VerticalWrapper>
          <S.HorizontalWrapper>
            <Interval/>
          </S.HorizontalWrapper>
          <S.HorizontalWrapper>
            <S.MenuWrapper>
              <Item 
                icon={modalInfo['Info_BPM'].icon} 
                stateActive={false}
                action={()=>control.setActionModal('Info_BPM')}
                tooltip={
                  "Show a tutorial about BPM Drift Interface"}/>  
            </S.MenuWrapper>
            <Item
                icon={modalInfo['BPM'].icon}
                stateActive={false}
                action={()=>control.setActionModal('BPM')}
                tooltip={
                  "Open a window for the selection of BPMs"}/>
            <DateInterval timeRef={true}/>
          </S.HorizontalWrapper>
        </S.VerticalWrapper>
      </Header>
      <DiffChart/>
      <Footer />
    </S.AppLayout>
  );
};
export default BpmDrift;
