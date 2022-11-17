import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import control from "../../../controllers/Modals";
import { iconList } from "../../../assets/constants/icons";
import { StoreInterface } from "../../../redux/storage/store";
import { modalInfo } from "../../../assets/constants/patterns";
import { ChangeInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {change_time} = state.time;
  const {change_bpm} = state.bpm;
  const {change_orbit} = state.orbit;

  return {
    changeBpm: change_bpm,
    changeTime: change_time,
    changeOrbit: change_orbit
  }
}

const defaultProps: ChangeInterface = {
  changeBpm: false,
  changeTime: false,
  changeOrbit: false
}

const Modals: React.FC<ChangeInterface> = (props) => {
  // Display a modal component with the content determined in the modalInfo file
  const [change, setChange] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  function closeModal(): void {
    const modal: any = modalInfo[control.getModalId()];
    control.setModalState(false);
    control.setModalTimeout(false);
    if(modal !== undefined && Object.keys(modal).includes("close")) {
      modal.close();
    }
    setChange(true);
  }

  const createTimeout = () => setTimeout(() => {
    if(control.getModalTimeout()){
      closeModal();
    }
  }, 5000)

  useEffect(() => {
    control.setFlagSetter(setChange);
  }, [])

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
