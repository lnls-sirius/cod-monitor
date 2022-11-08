import styled from "styled-components";
import { AnimButton } from "../../../assets/style/gen_styles";
import { colors, fonts, properties } from "../../../assets/style/themes";

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
    background-image: ${
        (props: { inChart: boolean; }) =>
        props.inChart?colors.bg.secondary_inac:colors.bg.transparent};
    &:hover{
        background-image: ${colors.bg.secondary};
    }
`;

export const Cell = styled.td`
`;

export const Header = styled.button`
    background: ${colors.btns.btn1.normal};
    padding: .08rem .8rem;
    margin: 0.5em 0em;
    ${AnimButton}
`;
