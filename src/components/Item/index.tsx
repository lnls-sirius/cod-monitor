import React from "react";
import * as S from './styled';

interface MenuItems {
  title: string;
  action: () => void;
}

const Item: React.FC<MenuItems> = (props): JSX.Element => {
  return (
    <S.ItemWrapper>
      <S.Button
        onClick={props.action}>
        {props.title}
      </S.Button>
    </S.ItemWrapper>
  );
};

export default Item;
