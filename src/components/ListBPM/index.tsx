import React from "react";
import { connect } from "react-redux";
import * as S from './styled';

function mapStateToProps(state: any){
  const {bpm_list, colors} = state.bpm;
  return {
    bpmList: JSON.parse(bpm_list),
    bpmColors: JSON.parse(colors)
  }
}

const BpmItem: React.FC<{name: string, color: string}> = (props) => {
  return <S.ItemWrapper>
    <S.Square color={props.color} />
    <S.TextWrapper>
      {props.name}
    </S.TextWrapper>
  </S.ItemWrapper>
}

const ListBPM: React.FC = (props: any) => {

  function listAllBpm(){
    return Object.entries(props.bpmList).map(([name, property]: any) => {
      if(property){
        return <BpmItem
                  name={name}
                  color={props.bpmColors[name]}/>;
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
