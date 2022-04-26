import React from "react";
import DiffChart from "../../components/DiffChart";
import Header from '../../components/Header'
import * as S from './styled';

const OrbitDrift: React.FC = () => {
  return (
    <S.AppLayout>
      <Header />
      <DiffChart
        chartData={[1,3,5,6,2]}/>
    </S.AppLayout>
  );
};
export default OrbitDrift;
