import React from "react";
import * as S from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddBPM from "../AddBPM";
import TimeInput from "../TimeInput";

type ModalOptions = {
  title: string;
  content: any;
  state: boolean;
  close: () => void;
}

function getComponent(component: any){
  switch(component){
    case 'add_bpm':{
      return <AddBPM/>
    }
    case 'date_config':{
      return <TimeInput action={'Start Time'}/>
    }
    default:{
      return 'Error'
    }
  }
}

function ModalBox(props: any){
  return (
    <S.ModalContainer
      {...props}
      centered
    >
      <S.Content>
        <S.Header>
          {props.title}
          <S.Close
            icon={faXmark}
            onClick={props.onHide}/>
        </S.Header>
        <S.Body>
          {getComponent(props.component)}
        </S.Body>
      </S.Content>
    </S.ModalContainer>
  );
}

const Modals: React.FC<ModalOptions> = (props): JSX.Element => {
  return(
    <ModalBox
      title={props.title}
      show={props.state}
      onHide={props.close}
      component={props.content}
    />
  );
};

export default Modals;
