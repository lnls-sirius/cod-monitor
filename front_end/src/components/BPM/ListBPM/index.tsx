import React from "react";
import { connect } from "react-redux";

import ChartLegend from "../../Patterns/ChartLegend";
import { deleteBPM, formatBPMName, getColor } from "../../../controllers/Chart/functions";
import { ActiveListInterface } from "../../../assets/interfaces/patterns";
import { StoreInterface } from "../../../redux/storage/store";

import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {bpm_list} = state.bpm;
  return {
    state_list: JSON.parse(bpm_list)
  }
}

const defaultProps: ActiveListInterface = {
  state_list: {}
}

const ListBPM: React.FC<ActiveListInterface> = (props) => {
  // Display all the legend items of the BPMs in the BPM drift page

  function listAllBpm(): (React.ReactElement | undefined)[] {
    // Show all the selected BPMs in the legend
    return Object.entries(props.state_list).map(
      ([name, property]: [string, boolean]) => {
        if(property){
          return (
            <ChartLegend
              color={getColor(name)}
              deleteAction={
                () => deleteBPM(name, props.state_list)}>
                  <S.TextWrapper>
                    {formatBPMName(name)}
                  </S.TextWrapper>
            </ChartLegend>);
        }
    });
  }

  return(
    <S.Wrapper>
      {listAllBpm()}
    </S.Wrapper>
  );
};

ListBPM.defaultProps = defaultProps;
export default connect(mapStateToProps)(ListBPM);
