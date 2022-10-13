import React from "react";
import { connect } from "react-redux";
import { ActiveListInterface } from "../../../controllers/Patterns/interfaces";
import { StoreInterface } from "../../../redux/storage/store";
import { deleteItem, formatBPMName, getColor } from "../../../controllers/Chart/functions";
import { BpmDispatcher } from "../../../redux/dispatcher";
import ChartLegend from "../../Patterns/ChartLegend";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {bpm_list} = state.bpm;
  return {
    state_list: JSON.parse(bpm_list)
  }
}

const ListBPM: React.FC<ActiveListInterface> = (props) => {

  function deleteFromList(name: string): void {
    deleteItem(name, props.state_list);
    BpmDispatcher.setBpmList(JSON.stringify(props.state_list));
    BpmDispatcher.setChangeBpm(true);
  }

  function listAllBpm(){
    return Object.entries(props.state_list).map(([name, property]: any) => {
      if(property){
        return (
          <ChartLegend
            color={getColor(name)}
            deleteAction={() => deleteFromList(name)}>
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

export default connect(mapStateToProps)(ListBPM);
