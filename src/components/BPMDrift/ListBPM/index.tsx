import React from "react";
import { connect } from "react-redux";
import { BpmInterface, BpmProperties } from "../../../controllers/Patterns/interfaces";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {list, colors} = state.bpm;
  return {
    bpmList: JSON.parse(list),
    bpmColors: JSON.parse(colors)
  }
}

const BpmItem: React.FC<BpmInterface> = (props) => {
  return <S.ItemWrapper>
    <S.Square color={props.color} />
    <S.TextWrapper>
      {props.name}
    </S.TextWrapper>
  </S.ItemWrapper>
}

const ListBPM: React.FC<BpmProperties> = (props) => {

  function listAllBpm(){
    let bpmCounter = 0;
    return Object.entries(props.bpmList).map(([name, property]: any) => {
      if(property){
        if (bpmCounter%6 == 0){
          if(props.bpmColors[name] == undefined){
            props.bpmColors[name] = '#FFFFFF';
          }
          return <BpmItem
            name={name}
            color={props.bpmColors[name]}/>;
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
