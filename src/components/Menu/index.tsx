import React from "react";
import Item from "../Item";
import * as S from './styled';

interface MenuItems {
  title: string;
  items: any;
}

function printItems(itemList: Array<number>){

  return Object.entries(itemList).map(([name, itemAction]) => (
    <Item
      title={name}
      action={itemAction}/>
  ));
}

const Menu: React.FC<MenuItems> = (props): JSX.Element => {
  return (
    <S.MenuWrapper>
      <S.Title>{props.title}</S.Title>
      <S.Content>
        {printItems(props.items)}
      </S.Content>
    </S.MenuWrapper>
  );
};

export default Menu;
