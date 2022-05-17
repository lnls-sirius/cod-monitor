import React from "react";
import * as S from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddBPM from "../AddBPM";
import TimeInput from "../TimeInput";

type ModalOptions = {
  title: string;
  size: string;
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
      size={props.size}
      centered
    >
      <S.Header>
        {props.title}
        <S.Close
          icon={faXmark}
          onClick={props.onHide}/>
      </S.Header>
      <S.Body>
        {getComponent(props.component)}
      </S.Body>
    </S.ModalContainer>
  );
}

const Modals: React.FC<ModalOptions> = (props): JSX.Element => {
  return(
    <ModalBox
      title={props.title}
      show={props.state}
      onHide={props.close}
      size={props.size}
      component={props.content}
    />
  );
};

export default Modals;
