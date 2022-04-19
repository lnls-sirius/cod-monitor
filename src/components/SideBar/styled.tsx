import styled from "styled-components";
import { FaTh } from "react-icons/fa";
import {colors} from '../../assets/theme';

export const Icon = styled(FaTh)`
  height: 35px;
  width: 35px;
  margin: 10px;
  color: #FFFFFF;
  padding: 5px;
  border-radius: 5px;
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