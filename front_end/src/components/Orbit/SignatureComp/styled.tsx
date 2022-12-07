import styled from "styled-components";
import { AnimButton, CenterAlignment, componentFill } from "../../../assets/style/gen_styles";
import { colors, fonts, properties } from "../../../assets/style/themes";

const SignatureWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${componentFill}
    margin: 1em 0em;
    align-items: center;
    justify-content: flex-start;
`;

const TableWrapper = styled.div`
    display: flex;
    width: 95%;
    max-height: 150vh;
    overflow-y: scroll;
    border-radius: ${properties.radius.medium};
    background-image: ${colors.bg.tertiary};
`;

const Table = styled.table`
    width: 100%;
    padding: 1em 0.5em;
    border-spacing: 0em 0.25em;
    ${CenterAlignment}
    color: ${colors.txt.primary};
    font-family: ${fonts.primary};
`;

const Row = styled.tr`
    background-image: ${
        (props: { inChart: boolean; }) =>
        props.inChart?colors.bg.secondary_inac:colors.bg.transparent};
    &:hover{
        background-image: ${colors.bg.secondary};
    }
`;

const Header = styled.button`
    background: ${colors.btns.btn1.normal};
    padding: .08rem .8rem;
    margin: 0.5em 0em;
    ${AnimButton}
`;

export {
    SignatureWrapper,
    TableWrapper,
    Table,
    Row,
    Header
}