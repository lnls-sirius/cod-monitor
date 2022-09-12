import styled from "styled-components";
import { colors } from "../../../assets/theme";

export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.txt.primary};
    margin: 0em 0.5em;
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    align-items: center;
    justify-content: center;
`;
