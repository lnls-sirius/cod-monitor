import React from "react";
import { connect } from "react-redux";
import { BpmInterface, BpmProperties } from "../../../controllers/Patterns/interfaces";
import { StoreInterface } from "../../../redux/storage/store";
import { deleteBpm, getColor } from "../../../controllers/Chart/functions";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Item from "../../Patterns/Item";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {list} = state.bpm;
  return {
    bpmList: JSON.parse(list)
  }
}

const BpmItem: React.FC<BpmInterface> = (props) => {

  function formatBPMName(name: string){
    name = name.replace('SI-', '');
    name = name.replace(':DI-BPM', '');
    name = name.replace('-Mon', '');
    return name;
  }

  return <S.ItemWrapper>
    <S.Square color={props.color} />
    <S.TextWrapper>
      {formatBPMName(props.name)}
    </S.TextWrapper>
    <Item
      icon={faTrashCan}
      action={()=>deleteBpm(props.name, props.bpmList)}/>
  </S.ItemWrapper>
}

const ListBPM: React.FC<BpmProperties> = (props) => {

  function listAllBpm(){
    let bpmCounter = 0;
    return Object.entries(props.bpmList).map(([name, property]: any) => {
      if(property){
        if (bpmCounter%6 == 0){
          return <BpmItem
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
