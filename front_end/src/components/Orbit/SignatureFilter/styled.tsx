import styled from "styled-components";
import { colors, fonts, properties } from "../../../assets/theme";

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
