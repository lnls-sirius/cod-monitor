import styled from "styled-components";
import { colors, fonts, properties } from "../../assets/theme";

export const Table = styled.table`
    width: 100%;
`;

export const Row = styled.tr`
`;

export const Column = styled.td`
`;

export const Select = styled.button`
    text-align: center;
    border-radius: ${properties.radius.extlight};
    padding: .05rem .8rem;
    margin: 0.1rem .1rem;
    border: none;
    font-family: ${fonts.primary};
    color: ${colors.txt.primary};
    background: ${(props: { selected: any; }) => props.selected?colors.btns.btn3.active:colors.btns.btn3.normal};
    &:hover{
        background-color: ${colors.btns.btn3.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background-color: ${colors.btns.btn3.active};
    }
`

export const Header = styled.button`
    text-align: center;
    border-radius: ${properties.radius.extlight};
    padding: .08rem .8rem;
    border: none;
    color: ${colors.txt.primary};
    font-family: ${fonts.primary};
    background: ${colors.btns.btn2.normal};
    &:hover{
        background-color: ${colors.btns.btn2.hover};
        transform: translateY(-.2rem);
    }
    &:active{
        background-color: ${colors.btns.btn2.active};
    }
`;
