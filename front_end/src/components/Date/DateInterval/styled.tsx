import styled from "styled-components";
import { CenterAlignment } from "../../../assets/style/gen_styles";
import { colors, properties } from "../../../assets/style/themes";

export const TextWrapper = styled.div`
    display: flex;
    ${CenterAlignment}
    color: ${colors.txt.primary};
    margin: 0em 0.5em;
`;

export const SelectTime = styled.select`
    background-color: ${colors.btns.btn_plain.normal};
    color: ${colors.txt.primary};
    min-width: 3em;
    border: none;
    padding: 0.4em;
    border-radius: ${properties.radius.light};
`

export const Option = styled.option`
`

export const DateWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

export const MenuWrapper = styled.div`
    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
    }    
    display: flex;
    flex-direction: row;
`