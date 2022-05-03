import React from "react";
import * as S from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPV from "../AddPV";

interface ModalOptions {
  type: number;
  close: () => void;
  state: boolean;
}

function routerModal(type: number){
  switch(type){
    case 0:{
      return (<AddPV />);
    }
    default:
    return "This function still haven't been implemented!";
  }
}

function ModalBox(props: any){
  return (
    <S.ModalWrapper
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <S.Header>
        <S.Title id="contained-modal-title-vcenter">
          Modal heading
        </S.Title>
      </S.Header>
      {routerModal(props.component)}
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
