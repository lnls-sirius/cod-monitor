import React from "react";
import { pages } from "../../../assets/text";
import * as S from './styled';

const Navigator: React.FC = () => {

  function pageIndicator(key: string, page: string){
    let path = window.location.pathname;
    if(path == '/'){
      path = '/orbitDrift';
    }
    return(
      <S.PageLink
        to={key}
        selected={path == key}>
          {page}
      </S.PageLink>
    );

  }

  return(
    <S.NavWrapper>
      {Object.entries(pages).map(([key, value]) => (
        pageIndicator(key, value)
      ))}
    </S.NavWrapper>
  );
};

export default Navigator;
