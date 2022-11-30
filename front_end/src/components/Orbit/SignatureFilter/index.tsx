import React, { useState } from "react";

import Item from "../../Patterns/Item";
import { magnet_types } from "../../../assets/constants/patterns";
import { DictState } from "../../../assets/interfaces/patterns";
import { FilterInterface } from "../../../assets/interfaces/orbit";
import * as S from './styled';

const defaultProps: FilterInterface = {
  setGlobExp: () => null,
  filterState: {},
  setFilterStates: () => null
}

const SignatureFilter: React.FC<FilterInterface> = (props) => {
  // Display the Filter for the signatures
  const [nameFilter, setNameFilter] = useState<string>('');

  // Set Filter for the magnets types
  function filterItem(magnet: string): void {
    let magnetStates: DictState = {...props.filterState};
    magnetStates[magnet] = !props.filterState[magnet];
    props.setFilterStates(magnetStates);
  }

  // Submit text filter changes on Enter press
  function submitHandler(event: React.KeyboardEvent): void {
    if(event.key == 'Enter'){
      props.setGlobExp(nameFilter);
    }
  }

  // Display filter Buttons
  function filterMagnetBtns(): React.ReactElement[]{
    return magnet_types.map((mag_type: string) => {
      return <Item
        icon={mag_type}
        action={()=>filterItem(mag_type)}
        stateActive={true}
        initState={true}/>
    })
  }

  function filterAxisBtn(): React.ReactElement[]{
    return ['X', 'Y'].map((axis: string) => {
      return <Item
        icon={axis}
        action={()=>filterItem(axis)}
        stateActive={true}
        initState={true}/>
    })
  }

  return(
    <S.FilterWrapper>
      <S.FilterRow>
        Filters
        <S.NameFilter type='text'
          value={nameFilter}
          onChange={(event)=>setNameFilter(
            event.target.value)}
          onKeyDown={submitHandler}/>
      </S.FilterRow>
      <S.FilterRow>
        Magnets:
        {filterMagnetBtns()}
        <Item
          icon='chart'
          action={()=>filterItem('chart')}
          stateActive={true}/>
        Axis:
        {filterAxisBtn()}
      </S.FilterRow>
    </S.FilterWrapper>
  );
};

SignatureFilter.defaultProps = defaultProps;
export default SignatureFilter;
