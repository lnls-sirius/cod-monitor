import React, { useState } from "react";
import DateInterval from "../../components/Date/DateInterval";
import DiffChart from "../../components/BPM/DiffChart";
import Header from '../../components/Structure/Header';
import Item from "../../components/Patterns/Item";
import Footer from "../../components/Structure/Footer";
import Interval from "../../components/Date/Interval";
import Modals from "../../components/Patterns/Modals";
import { modalInfo } from "../../controllers/Patterns/constants";
import ListBPM from "../../components/BPM/ListBPM";
import Loading from "../../components/Patterns/Loading";
import * as S from './styled';

const BpmDrift: React.FC = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalId, setModalId] = useState<string>('BPM');

  function closeModal() {
    if(modalInfo[modalId]!=undefined) {
      modalInfo[modalId].close();
    }
    setModalState(false);
  }

  return (
    <S.AppLayout>
      <Loading/>
      <Modals
        close={closeModal}
        state={modalState}
        id={modalId}/>
      <Header>
        <S.VerticalWrapper>
          <S.HorizontalWrapper>
            <Interval onChange={true}/>
          </S.HorizontalWrapper>
          <S.HorizontalWrapper>
            <Item
              id={modalId}
              setModalId={setModalId}
              setModalState={setModalState}
              icon={modalInfo[modalId].icon}/>
            <DateInterval timeRef={true}/>
          </S.HorizontalWrapper>
        </S.VerticalWrapper>
      </Header>
      <DiffChart id="diff"/>
      <ListBPM />
      <Footer />
    </S.AppLayout>
  );
};
export default BpmDrift;
