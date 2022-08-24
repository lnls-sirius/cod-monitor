import React from "react";
import { ActionItem, ModalItem } from "../../../controllers/Patterns/interfaces";
import * as S from './styled';

const Item: React.FC<ModalItem | ActionItem> = (props): React.ReactElement => {

  function printIcon(): React.ReactElement{
    if('id' in props){
      props.setModalId(props.id);
      return <S.Icon
        icon={props.icon}
        onClick={() =>{props.setModalState(true)}}/>
    }
    return <S.Icon
      icon={props.icon}
      onClick={() =>{props.action()}}/>

  }

return (
    <S.ItemWrapper>
      {printIcon()}
    </S.ItemWrapper>
  );
};

export default Item;
