import styled from "styled-components";
import { colors, properties } from "../../assets/theme";

export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    color: ${colors.txt.primary};
`;

export const ChangeMode = styled.button`
    display: flex;
    text-align: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: ${properties.radius.extlight};
    &:hover{
        background-color: ${colors.btns.btn1.hover};
    }
    &:active{
        background-color: ${colors.btns.btn1.active};
    }
`;
