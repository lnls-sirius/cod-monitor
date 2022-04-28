import styled from "styled-components";
import { colors, fonts, properties } from "../../assets/theme";

export const ItemWrapper = styled.div`
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
        background-color: ${colors.btns.btn2.hover};
    }
    &:active{
        background-color: ${colors.btns.btn2.active};
    }
`
