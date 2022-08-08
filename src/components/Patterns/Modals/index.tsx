import React from "react";
import * as S from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalInterface } from "../../../controllers/Structure/interfaces";

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
          {props.component}
        </S.Body>
      </S.Content>
    </S.ModalContainer>
  );
}

const Modals: React.FC<ModalInterface> = (props): JSX.Element => {
  return(
    <ModalBox
      title={props.title}
      show={props.state}
      onHide={props.close}
      component={props.component}
    />
  );
};

export default Modals;
