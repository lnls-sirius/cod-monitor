import React from "react";
import { connect } from "react-redux";
import { BpmProperties } from "../../../controllers/Patterns/interfaces";
import { StoreInterface } from "../../../redux/storage/store";
import { getColor } from "../../../controllers/Chart/functions";
import ChartLegend from "../../Patterns/ChartLegend";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {list} = state.bpm;
  return {
    bpmList: JSON.parse(list)
  }
}

const ListBPM: React.FC<BpmProperties> = (props) => {

  function listAllBpm(){
    let bpmCounter = 0;
    return Object.entries(props.bpmList).map(([name, property]: any) => {
      if(property){
        if (bpmCounter%6 == 0){
          return <ChartLegend
            name={name}
            color={getColor(name)}
            bpmList={props.bpmList}/>;
        }
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
