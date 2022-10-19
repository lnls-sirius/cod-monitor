import React from "react";
import DateInterval from "../../components/Date/DateInterval";
import Interval from "../../components/Date/Interval";
import OrbitCharts from "../../components/Orbit/OrbitCharts";
import SignatureComp from "../../components/Orbit/SignatureComp";
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
      <S.HorizontalWrapper>
        <OrbitCharts />
        <SignatureComp />
      </S.HorizontalWrapper>
      <Footer />
    </S.AppLayout>
  );
};
export default OrbitDrift;
