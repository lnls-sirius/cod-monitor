import React from "react";
import * as S from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPV from "../AddPV";
import TimeInput from "../TimeInput";

interface ModalOptions {
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
      return "This function still haven't been implemented!";
  }
}

function ModalBox(props: any){
  return (
    <S.ModalWrapper
      {...props}
      width='10px'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <S.Header>
        {props.component}
      </S.Header>
      <S.Body>
        {routerModal(props.component)}
      </S.Body>
      <S.Footer>
        <button onClick={props.onHide}>Close</button>
      </S.Footer>
    </S.ModalWrapper>
  );
}

const Modals: React.FC<ModalOptions> = (props): JSX.Element => {
  return(
    <ModalBox
      show={props.state}
      onHide={props.close}
      component={props.type}
    />
  );
};

export default Modals;
