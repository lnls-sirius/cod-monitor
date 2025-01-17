import styled from "styled-components";
import { CenterAlignment } from "../../../assets/style/gen_styles";
import { colors, properties } from "../../../assets/style/themes";

const TextWrapper = styled.div`
    display: flex;
    ${CenterAlignment}
    color: ${colors.txt.primary};
    margin: 0em 0.4em;
`;

const SelectTime = styled.select`
    background-color: ${colors.btns.btn_plain.normal};
    color: ${colors.txt.primary};
    min-width: 2em;
    border: none;
    padding: 0.2em 0.4em;
    border-radius: ${properties.radius.light};
`

const DateWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const MenuWrapper = styled.div`
    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
    }
    display: flex;
    flex-direction: row;
`

export {
    TextWrapper,
    SelectTime,
    DateWrapper,
    MenuWrapper
}
