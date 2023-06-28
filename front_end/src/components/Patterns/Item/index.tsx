import React, { useEffect, useState } from "react";
import Tooltip from "../Tooltip";
import { iconList } from "../../../assets/constants/icons";
import { ActionItem} from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: ActionItem = {
  action: () => null,
  icon: 'plus',
  stateActive: false,
  initState: false,
  isSmall: false,
  tooltip: ''
}

const Item: React.FC<ActionItem> = (props): React.ReactElement => {
  // Display an icon button
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    if(props.stateActive && props.initState){
      setState(false);
    }
  }, [])

  // Activate function and set button state
  function clickHandler(): void {
    props.action();
    if(props.stateActive){
      setState(!state);
    }
  }

  return (
    <S.ItemWrapper>
      <Tooltip
          text={props.tooltip}
          movable={true}>
        <S.Icon
          icon={iconList[props.icon]}
          onClick={() =>{clickHandler()}}
          state={state}
          small={props.isSmall}
          data-testid="item-test"/>
      </Tooltip>
    </S.ItemWrapper>
  );
};

Item.defaultProps = defaultProps;
export default Item;
