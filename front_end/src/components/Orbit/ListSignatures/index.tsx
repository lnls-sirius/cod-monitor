import React from "react";
import { connect } from "react-redux";

import ChartLegend from "../../Patterns/ChartLegend";
import { deleteSignature, getColor } from "../../../controllers/Chart/functions";
import { SignatureList } from "../../../assets/interfaces/orbit";
import { ArrDictArrStr } from "../../../assets/interfaces/types";
import { StoreInterface } from "../../../redux/storage/store";

import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {signatures} = state.orbit;
  return {
    sign_list: JSON.parse(signatures)
  }
}

const defaultProps: SignatureList = {
  sign_list: {}
}

const ListSignatures: React.FC<SignatureList> = (props) => {
  // Display all the legend items of the Signatures in the Orbit Drift

  function listAllBpm(){
    // Show all the selected Signatures in the legend
    return Object.entries(props.sign_list).map(([name, property]: ArrDictArrStr) => {
      if(property){
        const color_label = property[0]+"-Kick "+property[1]
        return (
          <ChartLegend
            color={getColor(color_label)}
            deleteAction={
              () => deleteSignature(name, props.sign_list)}>
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

ListSignatures.defaultProps = defaultProps;
export default connect(mapStateToProps)(ListSignatures);
