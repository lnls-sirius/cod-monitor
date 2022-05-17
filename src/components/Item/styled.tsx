import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { colors, fonts, properties } from "../../assets/theme";

export const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-family: ${fonts.primary};
`;

export const Button = styled.button`
    padding: 5px;
    border: 0px solid ${colors.bg.transparent};
    border-radius: ${properties.radius.light};
    background-color: ${colors.bg.transparent};
    color: ${colors.txt.primary};
    &:hover{
        background-color: ${colors.btns.btn1.hover};
    }
    &:active{
        background-color: ${colors.btns.btn1.active};
    }
`

export const Icon = styled(FontAwesomeIcon)`
    height: 35px;
    width: 35px;
    color: ${colors.bg.white};
    padding: 5px;
    border-radius: ${properties.radius.extlight};
    &:hover{
    background-color: ${colors.btns.btn1.hover};
    }
    &:active{
    background-color: ${colors.btns.btn1.active};
    }
`;
