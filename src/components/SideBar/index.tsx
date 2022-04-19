import React from "react";
import {Drawer} from '@mui/material';
import * as S from './styled';

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

  const list = () => (
    "wer"
  );
//<List />
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