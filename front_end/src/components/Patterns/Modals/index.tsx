import React from "react";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalInterface } from "../../../controllers/Patterns/interfaces";
import { modalInfo } from "../../../controllers/Patterns/constants";
import * as S from './styled';

const Modals: React.FC<ModalInterface> = (props): React.ReactElement => {
  return(
    <S.ModalContainer
      show={props.state}
      onHide={props.close}
      centered>
        <S.Content>
          <S.Header>
            {modalInfo[props.id].title}
            <S.Close
              icon={faXmark}
              onClick={props.close}/>
          </S.Header>
          <S.Body>
            {modalInfo[props.id].component}
          </S.Body>
        </S.Content>
      </S.ModalContainer>
  );
};

export default Modals;
