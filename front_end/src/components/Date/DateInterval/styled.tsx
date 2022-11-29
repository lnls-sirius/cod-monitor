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
    background: ${colors.bg.tertiary};
    color: ${colors.txt.primary};
    width: 4.5em;
    border: none;
    padding: 0.4em;
    border-radius: ${properties.radius.light}
`
