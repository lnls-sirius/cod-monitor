import React, { useState } from "react";

import { iconList } from "../../../assets/icons";
import { ActionItem} from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: ActionItem = {
  action: () => null,
  icon: 'plus',
  stateActive: false,
  isSmall: false
}

const Item: React.FC<ActionItem> = (props): React.ReactElement => {
  // Display an icon button
  const [state, setState] = useState<boolean>(true);

  // Activate function and set button state
  function clickHandler(): void {
    props.action();
    if(props.stateActive){
      setState(!state);
    }
  }

  return (
    <S.ItemWrapper>
      <S.Icon
        icon={iconList[props.icon]}
        onClick={() =>{clickHandler()}}
        state={state}
        small={props.isSmall}/>
    </S.ItemWrapper>
  );
};

Item.defaultProps = defaultProps;
export default Item;
