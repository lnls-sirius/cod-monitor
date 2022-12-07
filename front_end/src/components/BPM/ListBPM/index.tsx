import React from "react";
import { connect } from "react-redux";

import ChartLegend from "../../Patterns/ChartLegend";
import { getColor } from "../../../controllers/chart";
import { deleteBPM, formatBPMName, visibleBPM } from "../../../controllers/bpm";
import { ActiveListInterface } from "../../../assets/interfaces/bpm";
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
      ([name, property]: [string, Array<boolean>]) => {
        if(property[0]){
          return (
            <ChartLegend
              key={name}
              isVisible={property[1]}
              color={getColor(name)}
              deleteAction={
                () => deleteBPM(name, props.state_list)}
              visibleAction={
                () => visibleBPM(name, props.state_list)}>
                  <S.TextWrapper>
                    {formatBPMName(name)}
                  </S.TextWrapper>
            </ChartLegend>);
        }
    });
  }

  return(
    <S.ListWrapper>
      {listAllBpm()}
    </S.ListWrapper>
  );
};

ListBPM.defaultProps = defaultProps;
export default connect(mapStateToProps)(ListBPM);
