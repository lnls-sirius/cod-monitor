import styled from "styled-components";
import { colors, properties } from "../../assets/theme";

export const Table = styled.table`
    width: 100%;
`;

export const Row = styled.tr`
`;

export const Column = styled.td`
`;

export const Header = styled.button`
    text-align: center;
    border-radius: ${properties.radius.extlight};
    padding: 2px 10px;
    border: none;
    background: ${colors.btns.btn3.normal};
    &:hover{
        background-color: ${colors.btns.btn3.hover};
    }
    &:active{
        background-color: ${colors.btns.btn3.active};
    }
`;
