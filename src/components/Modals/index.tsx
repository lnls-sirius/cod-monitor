import React from "react";
import * as S from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ModalOptions = {
  title: string;
  size: string;
  content: JSX.Element;
  state: boolean;
  close: () => void;
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
        {props.component}
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
