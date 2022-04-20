import React from "react";
import Item from "../Item";
import * as S from './styled';

interface MenuItems {
  title: string;
  items: Array<string>;
}

function printItems(itemList: Array<string>){
  return itemList.map((item)=>
    <Item title={item}/>
  );
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