import React, { useState } from "react";
import archInterface from "../../data-access";
import Modals from "../Modals";
import * as S from './styled';

interface MenuItems {
  title: string;
  action: any;
}

const Item: React.FC<MenuItems> = (props): JSX.Element => {

  //getArchiver -> Get ArchiverViewer Data
  async function getArchiver(){
    try {
      let startDate = new Date('Tue May 03 2022 10:52:59 GMT-0300 (Brasilia Standard Time)');
      let endDate = new Date('Tue May 03 2022 11:52:59 GMT-0300 (Brasilia Standard Time)');
      console.log(startDate+'/'+endDate);
      const res = await archInterface.fetchData('SI-02C3:DI-BPM-1:PosX-Mon', startDate, endDate);
      const { data } = res;

      console.log(data);
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
  }

  const [modalState, setModalState] = useState(false);

  return (
    <S.ItemWrapper>
      <Modals
        type={props.action}
        close={() =>{setModalState(false)}}
        state={modalState}
        size='xl'/>
      <S.Button
        onClick={() =>{setModalState(true)}}>
        {props.title}
      </S.Button>
    </S.ItemWrapper>
  );
};

export default Item;
