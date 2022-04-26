import React, { ReactFragment } from "react";
import {Drawer} from '@mui/material';
import Menu from "../Menu";
import * as S from './styled';
import { sideMenu } from "../../assets/text";
import Logo from "../Logo";
import Footer from "../Footer";

//edit use text.ts to set texts
const SideBar: React.FC = () => {
  const [sbarState, setSbarState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setSbarState(open);
      };

  function list(){
    return (
      <S.ListWrapper>
        <Logo />
        {Object.entries(sideMenu).map(([key, value]) => (
          <Menu
            title={key}
            items={value.general}/>
        ))}
        <Footer />
      </S.ListWrapper>
    );
  }

  return (
    <div>
      <S.MenuWrapper>
        <S.Icon
          onClick={toggleDrawer(true)}/>
        <Drawer
          anchor={'left'}
          open={sbarState}
          onClose={toggleDrawer(false)}
        >
        {list()}
        </Drawer>
      </S.MenuWrapper>
    </div>
  );
}

export default SideBar;
