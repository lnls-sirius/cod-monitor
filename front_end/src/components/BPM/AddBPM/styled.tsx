import styled from "styled-components";
import { AnimButton, AnimButton2 } from "../../../assets/gen_styles";
import { colors, fonts, properties } from "../../../assets/themes";

export const Table = styled.table`
    width: 100%;
`;

export const Row = styled.tr`
`;

export const Column = styled.td`
`;

export const Select = styled.button`
    ${AnimButton2}
    margin: 0rem 0.2rem;
    padding: 0rem 0.5rem;
`


export const Header = styled.button`
    background: ${colors.btns.btn1.normal};
    padding: .08rem .8rem;
    margin: 0.5em 0em;
    ${AnimButton}
`;
