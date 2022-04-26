import React from "react";
import Item from "../Item";
import * as S from './styled';

interface MenuItems {
  title: string;
  items: any;
}

function printItems(itemList: Array<string>){
  return Object.entries(itemList).map(([name, action]) => (
    <Item
      title={name}/>
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
