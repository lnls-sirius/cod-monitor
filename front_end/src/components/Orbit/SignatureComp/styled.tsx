import styled from "styled-components";
import { colors, fonts, properties } from "../../../assets/theme";

export const SignatureWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 1em 0em;
    align-items: center;
    justify-content: flex-start;
`;

export const TableWrapper = styled.div`
    display: flex;
    width: 95%;
    max-height: 90vh;
    overflow-y: scroll;
    border-radius: ${properties.radius.medium};
    background-image: ${colors.bg.tertiary};
`;

export const Table = styled.table`
    width: 100%;
    padding: 1em 2em;
    border-spacing: 0em 0.25em;
    text-align: center;
    color: ${colors.txt.primary};
    font-family: ${fonts.primary};
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
