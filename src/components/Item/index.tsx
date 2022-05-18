import { faClock, faExclamation, faListCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modals from "../Modals";
import * as S from './styled';

interface MenuItems {
  id: string;
  title: string;
  type:number;
}

const Item: React.FC<MenuItems> = (props): JSX.Element => {
  const [modalState, setModalState] = useState(false);

  function getIcon(){
    switch(props.id){
      case 'add_bpm':{
        return faListCheck;
      }
      case 'date_config':{
        return faClock;
      }
      default:{
        return faExclamation;
      }
    }
  }

  function printBtn(){
    switch(props.type){
      case 1:{
        return (
          <S.Button
            onClick={() =>{setModalState(true)}}>
              {props.title}
          </S.Button>
        );
      }
      case 2:{
        return <S.Icon
                  icon={getIcon()}
                  onClick={() =>{setModalState(true)}}/>
      }
      default:{
        return <S.Button
                  onClick={()=>null}>
                  Function not Implemented
                </S.Button>
      }
    }
  }

  return (
    <S.ItemWrapper>
      <Modals
        content={props.id}
        close={() =>{setModalState(false)}}
        state={modalState}
        title={props.title}/>
      {printBtn()}
    </S.ItemWrapper>
  );
};

export default Item;
