import React from "react";
import { pages } from "../../assets/text";
import * as S from './styled';

//Edit change page with < title >
//Use only one component for the items

const Navigator: React.FC = () => {
  
  function pageIndicator(key: string, page: string){
    let path = window.location.pathname;
    if(path == '/'){
      path = '/orbitDrift';
    }
    if(path == key){
      return(
        <S.PageAct>
          {page}
        </S.PageAct>
      );
    }else{
      return(
        <S.PageLink to={key}>
          {page}
        </S.PageLink>
      );
    }
    
  }

  return(
    <S.NavWrapper>
      {Object.entries(pages).map(([key, value]) => (
        pageIndicator(key, value)
      ))}
    </S.NavWrapper>
  );
};
/**/

export default Navigator;
