import React from "react";

import { pages } from "../../../assets/text";
import * as S from './styled';

const Navigator: React.FC = () => {
  // Display the Navigator buttons

  // Detect active page and show buttons
  function pageIndicator(key: string, page: string): React.ReactElement {
    let path = window.location.pathname;
    if(path == '/'){
      path = '/orbitDrift';
    }
    return(
      <S.PageLink
        key={key}
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
