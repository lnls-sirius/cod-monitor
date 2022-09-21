import React from "react";
import DiffChart from "../../components/BPM/DiffChart";
import DateInterval from "../../components/Date/DateInterval";
import Interval from "../../components/Date/Interval";
import OrbitInterval from "../../components/Date/OrbitInterval";
import Loading from "../../components/Patterns/Loading";
import Footer from "../../components/Structure/Footer";
import Header from "../../components/Structure/Header";
import * as S from './styled';

const OrbitDrift: React.FC = () => {

  return (
    <S.AppLayout>
      <Loading/>
      <Header>
        <S.VerticalWrapper>
            <S.HorizontalWrapper>
              <Interval onChange={false} />
            </S.HorizontalWrapper>
            <S.HorizontalWrapper>
              <DateInterval timeRef={false}/>
            </S.HorizontalWrapper>
          </S.VerticalWrapper>
      </Header>
      <DiffChart id="orbit"/>
      <OrbitInterval/>
      <Footer />
    </S.AppLayout>
  );
};
export default OrbitDrift;