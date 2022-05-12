import React from "react";
import * as S from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AddPV from "../AddPV";
import TimeInput from "../TimeInput";

interface ModalOptions {
  size: string;
  type: string;
  close: () => void;
  state: boolean;
}

function routerModal(type: string){
  switch(type){
    case 'Add PV':{
      return (<AddPV />);
    }
    case 'Start Time':
    case 'End Time':
    {
      return (<TimeInput
                action={type}/>);
    }
    default:
      return "This function still hasn't been implemented!";
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
        {props.component}
        <S.Close
          icon={faXmark}
          onClick={props.onHide}/>
      </S.Header>
      <S.Body>
        {routerModal(props.component)}
      </S.Body>
    </S.ModalContainer>
  );
}

const Modals: React.FC<ModalOptions> = (props): JSX.Element => {
  return(
    <ModalBox
      show={props.state}
      onHide={props.close}
      size={props.size}
      component={props.type}
    />
  );
};

export default Modals;
