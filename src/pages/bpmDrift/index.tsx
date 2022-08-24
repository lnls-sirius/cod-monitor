import React, { useState } from "react";
import DateInterval from "../../components/Date/DateInterval";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Structure/Header';
import Logo from "../../components/Structure/Logo";
import Navigator from "../../components/Structure/Navigator";
import Item from "../../components/Patterns/Item";
import Footer from "../../components/Structure/Footer";
import Interval from "../../components/Date/Interval";
import ListBPM from "../../components/ListBPM";
import Modals from "../../components/Patterns/Modals";
import { modalInfo } from "../../controllers/Patterns/constants";
import * as S from './styled';

const BpmDrift: React.FC = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalId, setModalId] = useState<string>('BPM');

  return (
    <S.AppLayout>
      <Modals
        close={() =>{setModalState(false)}}
        state={modalState}
        id={modalId}/>
      <Header>
        <S.HorizontalWrapper>
          <Logo />
          <Navigator />
          <S.VerticalWrapper>
            <S.HorizontalWrapper>
              <Interval />
            </S.HorizontalWrapper>
            <S.HorizontalWrapper>
              <Item
                id="BPM"
                setModalId={setModalId}
                setModalState={setModalState}
                icon={modalInfo[modalId].icon}/>
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
