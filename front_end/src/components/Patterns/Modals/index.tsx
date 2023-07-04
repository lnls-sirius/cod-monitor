import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import control from "../../../controllers/Modals";
import { iconList } from "../../../assets/constants/icons";
import { StoreInterface } from "../../../redux/storage/store";
import { modalInfo } from "../../../assets/constants/patterns";
import { ChangeInterface, ModalInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {change_time} = state.time;
  const {change_bpm} = state.bpm;
  const {change_cod_orbit, change_orbit} = state.orbit;

  return {
    changeBpm: change_bpm,
    changeTime: change_time,
    changeOrbit: change_orbit,
    changeCodOrbit: change_cod_orbit
  }
}

const defaultProps: ChangeInterface = {
  changeBpm: false,
  changeTime: false,
  changeOrbit: false,
  changeCodOrbit: false
}

const Modals: React.FC<ChangeInterface> = (props) => {
  // Display a modal component with the content determined in the modalInfo file
  const [change, setChange] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  // Operations made after the modal is closed
  function closeModal(): void {
    const modal: ModalInterface = modalInfo[control.getModalId()];
    if(Object.keys(modal).includes("close")) {
      modal.close();
    }
    control.setModalState(false);
    control.setModalTimeout(false);
    setChange(true);
  }

  // Timeout counter for alerts
  const createTimeout = () => setTimeout(() => {
    if(control.getModalTimeout()){
      closeModal();
    }
  }, 5000)

  // Set modal state
  useEffect(() => {
    control.setFlagSetter(setChange);
  }, [])

  // Detect if there is a change and activate the alert message
  useEffect(() => {
    setChange(false);
    clearTimeout(timer);
    if(control.getModalState() && control.getModalTimeout()){
      timer = createTimeout();
    }else{
      control.setModalTimeout(false);
    }
  }, [props.changeBpm,
      props.changeTime,
      props.changeOrbit,
      change]);

  // Show the modal component
  function showModal(): React.ReactElement {
    if(control.getModalState()){
      return(
        <S.ModalContainer
          show={control.getModalState()}
          styling={control.getModalStyling()}
          onClick={closeModal}>
            <S.Content
              styling={control.getModalStyling()}
              onClick={e => e.stopPropagation()}>
                <S.Header
                  styling={control.getModalStyling()}>
                    {modalInfo[control.getModalId()].title}
                      <S.Close
                        icon={iconList['x']}
                        styling={control.getModalStyling()}
                        onClick={closeModal}/>
                </S.Header>
                <S.Body
                  styling={control.getModalStyling()}>
                    {modalInfo[control.getModalId()].component}
                </S.Body>
            </S.Content>
          </S.ModalContainer>
      );
    }
    return <div/>;
  }

  return (
    <div>
      {showModal()}
    </div>
  )
};

Modals.defaultProps = defaultProps;
export default connect(mapStateToProps)(Modals);
