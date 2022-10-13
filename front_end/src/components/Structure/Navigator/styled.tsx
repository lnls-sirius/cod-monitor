import styled from "styled-components";
import {Link} from 'react-router-dom';
import {colors, properties} from '../../../assets/theme';


export const NavWrapper = styled.nav`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

export const PageLink = styled(Link)`
  color: ${colors.txt.primary};
  text-decoration: none;
  text-align: center;
  padding: 5px;
  border-radius: ${properties.radius.medium};
  margin: 5px;
  &:hover{
    background-color: ${colors.btns.btn1.hover};
  }
  &:active{
    background-color: ${colors.btns.btn1.active};
  }
`

export const PageAct = styled.span`
  color: ${colors.txt.primary};
  text-decoration: none;
  text-align: center;
  padding: 5px;
  margin: 5px;
  border-radius: ${properties.radius.medium};
  background-color: ${colors.btns.btn1.hover};
`
