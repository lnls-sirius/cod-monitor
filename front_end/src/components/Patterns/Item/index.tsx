import React, { useState } from "react";
import { iconList } from "../../../assets/icons";
import { ActionItem} from "../../../controllers/Patterns/interfaces";
import * as S from './styled';

const Item: React.FC<ActionItem> = (props): React.ReactElement => {
  const [state, setState] = useState<boolean>(true);

  function clickHandler(){
    props.action();
    if(props.stateActive){
      setState(!state);
    }
  }

  function printIcon(): React.ReactElement{
      return <S.Icon
        icon={iconList[props.icon]}
        onClick={() =>{clickHandler()}}
        state={state}
        small={props.isSmall}/>

  }

  return (
    <S.ItemWrapper>
      {printIcon()}
    </S.ItemWrapper>
  );
};

Item.defaultProps = {
  stateActive: false,
  isSmall: false
}

export default Item;
