import React from "react";

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { modalInfo } from "../../../assets/constants/patterns";
import { ModalInterface } from "../../../controllers/Patterns/interfaces";
import * as S from './styled';

const defaultProps: ModalInterface = {
  state: false,
  id: 'BPM',
  close: ()=>null
};

const Modals: React.FC<ModalInterface> = (props): React.ReactElement => {
  // Display a modal component with the content determined in the modalInfo file
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

Modals.defaultProps = defaultProps;
export default Modals;
