import styled from "styled-components";
import { colors, fonts, properties } from "../../assets/theme";

export const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1em 0em;
    align-items: center;
`;

export const Table = styled.table`
    margin: 1em;
    padding: 1em 2em;
    border-spacing: 0em 0.25em;
    width: 90%;
    color: ${colors.txt.primary};
    font-family: ${fonts.primary};
    text-align: center;
    border-radius: ${properties.radius.medium};
    background-image: ${colors.bg.tertiary};
`;

export const Row = styled.tr`
    &:hover{
        background-image: ${colors.bg.secondary};
    }
`;

export const Cell = styled.td`
`;

export const Header = styled.button`
    text-align: center;
    border-radius: ${properties.radius.extlight};
    padding: .08rem .8rem;
    margin: 0em;
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

export const Filter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${colors.txt.primary};
    font-family: ${fonts.primary};
`

export const NameFilter = styled.input`
    height: 1.5em;
    margin: 0em 1em;
    border-radius: ${properties.radius.extlight};
`
