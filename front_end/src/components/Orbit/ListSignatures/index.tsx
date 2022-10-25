import React from "react";
import { connect } from "react-redux";
import { StoreInterface } from "../../../redux/storage/store";
import { getColor } from "../../../controllers/Chart/functions";
import ChartLegend from "../../Patterns/ChartLegend";
import { deleteSignature } from "../../../controllers/Orbit/functions";
import { BaseMagnet } from "../../../controllers/Orbit/interfaces";
import * as S from './styled';
import { OrbitDispatcher } from "../../../redux/dispatcher";

function mapStateToProps(state: StoreInterface){
  const {signatures} = state.orbit;
  return {
    sign_list: JSON.parse(signatures)
  }
}

const ListSignatures: React.FC<{sign_list: BaseMagnet}> = (props) => {

  function deleteFromList(name: string): void {
    deleteSignature(name, props.sign_list);
  }

  function deleteHandler(name: string){
    deleteFromList(name);
    OrbitDispatcher.setChangeOrbit(true);
  }

  function listAllBpm(){
    return Object.entries(props.sign_list).map(([name, property]: any) => {
      if(property){
        const color_label = property[0]+"-Kick "+property[1]
        return (
          <ChartLegend
            color={getColor(color_label)}
            deleteAction={
              () => deleteHandler(name)}>
              <S.TextWrapper>
                {property[0]} - Kick: {property[1]}
              </S.TextWrapper>
          </ChartLegend>);
      }
    });
  }

  return(
    <S.Wrapper>
      <ChartLegend
        color={getColor('cod_rebuilt')}
        deleteAction={null}>
          <S.TextWrapper>
            COD Rebuilt
          </S.TextWrapper>
      </ChartLegend>
      {listAllBpm()}
    </S.Wrapper>
  );
};

export default connect(mapStateToProps)(ListSignatures);
