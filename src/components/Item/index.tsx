import React from "react";
import * as S from './styled';

interface MenuItems {
  title: string;
}

const Item: React.FC<MenuItems> = (props): JSX.Element => {
  return (
    <S.ItemWrapper> 
      {props.title}
    </S.ItemWrapper>
  );
};

export default Item;