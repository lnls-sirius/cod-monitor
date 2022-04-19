import styled from "styled-components";
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {colors, properties} from '../../assets/theme';


export const NavWrapper = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.img`
  margin: 4px;
  padding: 2px; 
  background-color: ${colors.bg.white};
  border-radius:  ${properties.radius.medium};
`;

export const PageLink = styled(Link)`
  color: ${colors.txt.primary};
  text-decoration: none;
  padding: 10px;
  border-radius: ${properties.radius.light};
  &:hover{
    background-color: ${colors.btn.hover_btn1};
  }
  &:active{
    background-color: ${colors.btn.active_btn1};
  }
`
export const GridEle = styled(Grid)`
  text-align:center;
`

