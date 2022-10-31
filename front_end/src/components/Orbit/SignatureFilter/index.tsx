import React, { useState } from "react";
import Item from "../../Patterns/Item";
import { FilterInterface } from "../../../assets/interfaces/orbit";
import * as S from './styled';
import { magnet_types } from "../../../assets/constants/patterns";
import { DictState } from "../../../assets/interfaces/patterns";

const defaultProps: FilterInterface = {
  setGlobExp: () => null,
  filterState: {},
  setFilterStates: () => null
}

const SignatureFilter: React.FC<FilterInterface> = (props) => {
  // Display the Filter for the signatures
  const [nameFilter, setNameFilter] = useState<string>('');
  const [magnetFilter, setMagnetFilter] = useState<DictState>(props.filterState);

  // Set Filter for the magnets types
  function filterMagnet(magnet: string): void {
    console.log("2")
    let magnetStates = props.filterState;
    magnetStates[magnet] = !magnetStates[magnet];
    setMagnetFilter(magnetStates);
  }

  // Submit filter changes on Enter press
  function submitHandler(event: React.KeyboardEvent): void {
    if(event.key == 'Enter'){
      props.setGlobExp(nameFilter);
      props.setFilterStates(magnetFilter);
    }
  }

  // Display filter Buttons
  function filterMagnetBtns(): React.ReactElement[]{
    return magnet_types.map((mag_type: string) => {
      return <Item
        icon={mag_type}
        action={()=>filterMagnet(mag_type)}
        stateActive={true}/>
    })
  }

  return(
    <S.Filter>
      Filter:
        <S.NameFilter type='text'
          value={nameFilter}
          onChange={(event)=>setNameFilter(
            event.target.value)}
          onKeyDown={submitHandler}/>
      {filterMagnetBtns()}
    </S.Filter>
  );
};

SignatureFilter.defaultProps = defaultProps;
export default SignatureFilter;
