import {Modal} from "react-bootstrap";
import React, { useState } from "react";
import * as S from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalBox(props: any){
  return (
    <Modal
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
      <S.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </S.Body>
      <S.Footer>
        <button onClick={props.onHide}>Close</button>
      </S.Footer>
    </Modal>
  );
}

const Modals: React.FC = () => {
  const [modalState, setModalState] = useState(true);

  return(
    <ModalBox
      show={modalState}
      onHide={() => setModalState(false)}
    />
  );
};

export default Modals;
