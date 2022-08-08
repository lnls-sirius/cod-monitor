import React, { useState } from "react";
import { MenuItems } from "../../../controllers/Structure/interfaces";
import Modals from "../Modals";
import * as S from './styled';

const Item: React.FC<MenuItems> = (props): JSX.Element => {
  const [modalState, setModalState] = useState(false);

  function printBtn(){
    if(props.icon){
      return <S.Icon
        icon={props.icon}
        onClick={() =>{setModalState(true)}}/>
    }else{
      return (
        <S.Button
          onClick={() =>{setModalState(true)}}>
            {props.text}
        </S.Button>
      );
    }
  }

return (
    <S.ItemWrapper>
      <Modals
        component={props.component}
        close={() =>{setModalState(false)}}
        state={modalState}
        title={props.title}/>
      {printBtn()}
    </S.ItemWrapper>
  );
};

export default Item;
