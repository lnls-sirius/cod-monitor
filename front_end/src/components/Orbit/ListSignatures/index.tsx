import React from "react";
import { connect } from "react-redux";

import ChartLegend from "../../Patterns/ChartLegend";
import { getColor } from "../../../controllers/chart";
import { deleteSignature, visibleSignature } from "../../../controllers/orbit";
import { SignatureListInterface } from "../../../assets/interfaces/orbit";
import { ArrDictArrStr } from "../../../assets/interfaces/types";
import { StoreInterface } from "../../../redux/storage/store";

import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const { signatures } = state.orbit;
  return {
    sign_list: JSON.parse(signatures)
  }
}

const defaultProps: SignatureListInterface = {
  sign_list: {}
}

const ListSignatures: React.FC<SignatureListInterface> = (props) => {
  // Display all the legend items of the Signatures in the Orbit Drift

  function listAllSignatures(): (React.ReactElement | undefined)[]{
    // Show all the selected Signatures in the legend
    return Object.entries(props.sign_list).map(([name, property]: ArrDictArrStr) => {
      if(property){
        const color_label = property[0] + '- Kick:' + property[1]
        return (
          <ChartLegend
            key={name}
            color={getColor(color_label)}
            isVisible={property[3]==='true'}
            deleteAction={
              () => deleteSignature(name, props.sign_list)}
            visibleAction={
              () => visibleSignature(name, props.sign_list)}>
              <S.TextWrapper>
                {color_label}
              </S.TextWrapper>
          </ChartLegend>);
      }
    });
  }

  return(
    <S.ListWrapper>
      <ChartLegend
        color={getColor('cod_rebuilt')}
        isVisible={true}
        deleteAction={null}
        visibleAction={
          () => visibleSignature('cod_rebuilt', props.sign_list)}>
          <S.TextWrapper>
            COD Rebuilt
          </S.TextWrapper>
      </ChartLegend>
      {listAllSignatures()}
    </S.ListWrapper>
  );
};

ListSignatures.defaultProps = defaultProps;
export default connect(mapStateToProps)(ListSignatures);
