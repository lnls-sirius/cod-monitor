import { faC, faD, faQ, faS } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Item from "../../Patterns/Item";
import * as S from './styled';

const SignatureFilter: React.FC<{setGlobExp: any, filterState: any, setFilterStates: any}> = (props) => {
  const [nameFilter, setNameFilter] = useState<string>('');

  function filterMagnet(magnet: number){
    let magnetStates = [...props.filterState];
    magnetStates[magnet] = !magnetStates[magnet];
    props.setFilterStates(magnetStates);
  }

  function submitHandler(event: React.KeyboardEvent){
    if(event.key == 'Enter'){
      props.setGlobExp(nameFilter);
    }
  }

  return(
    <S.Filter>
      Filter:
        <S.NameFilter type='text'
          value={nameFilter}
          onChange={(event)=>setNameFilter(
            event.target.value)}
          onKeyDown={submitHandler}/>
        <Item
          icon={faC}
          action={()=>filterMagnet(0)}
          stateActive={true}/>
        <Item
          icon={faD}
          action={()=>filterMagnet(1)}
          stateActive={true}/>
        <Item
          icon={faQ}
          action={()=>filterMagnet(2)}
          stateActive={true}/>
        <Item
          icon={faS}
          action={()=>filterMagnet(3)}
          stateActive={true}/>
    </S.Filter>
  );
};

export default SignatureFilter;
