import styled from "styled-components";
import { colors, fonts, properties } from "../../../assets/style/themes";

export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    padding: 0.5em 1em;
    background: ${colors.bg.tertiary};
    border-radius: ${properties.radius.extlight};
    color: ${colors.txt.primary};
    font-family: ${fonts.primary};
`

export const FilterRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const NameFilter = styled.input`
    height: 1.5em;
    width: 10em;
    margin: 0em 1em;
    border-radius: ${properties.radius.extlight};
`
