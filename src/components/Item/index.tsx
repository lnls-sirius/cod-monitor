import React, { useState } from "react";
import Modals from "../Modals";
import * as S from './styled';

interface MenuItems {
  title: string;
  action: any;
}

const Item: React.FC<MenuItems> = (props): JSX.Element => {
  const [modalState, setModalState] = useState(false);

  return (
    <S.ItemWrapper>
      <Modals
        type={props.action}
        close={() =>{setModalState(false)}}
        state={modalState}
        size='xl'/>
      <S.Button
        onClick={() =>{setModalState(true)}}>
        {props.title}
      </S.Button>
    </S.ItemWrapper>
  );
};

export default Item;
