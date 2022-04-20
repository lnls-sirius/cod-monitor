import styled from "styled-components";
import {Link} from 'react-router-dom';
import {colors, properties} from '../../assets/theme';


export const NavWrapper = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const PageLink = styled(Link)`
  color: ${colors.txt.primary};
  text-decoration: none;
  padding: 10px;
  border-radius: ${properties.radius.medium};
  margin: 5px;
  &:hover{
    background-color: ${colors.btn.hover_btn1};
  }
  &:active{
    background-color: ${colors.btn.active_btn1};
  }
`

export const PageAct = styled.span`
  color: ${colors.txt.primary};
  text-decoration: none;
  padding: 10px;
  margin: 5px;
  border-radius: ${properties.radius.medium};
  background-color: ${colors.btn.hover_btn1};
`