import styled from "styled-components";
import { FaTh } from "react-icons/fa";
import {colors, properties} from '../../assets/theme';

export const Icon = styled(FaTh)`
  height: 35px;
  width: 35px;
  margin: 10px;
  color: ${colors.bg.white};
  padding: 5px;
  border-radius: ${properties.radius.extlight};
  &:hover{
    background-color: ${colors.btn.hover_btn1};
  }
  &:active{
    background-color: ${colors.btn.active_btn1};
  } 
`;

export const MenuWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ListWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
  height: 100%;
  align-items: flex-start;
  background-image: ${colors.bg.tertiary}
  `