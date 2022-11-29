import styled from "styled-components";
import { CenterAlignment } from "../../../assets/style/gen_styles";

export const Wrapper = styled.div`
    display: grid;
    width: 100%;
    @media (min-width: 1500px) {
        grid-template-columns: repeat(4, 24%);
    }
    @media (min-width: 1250px) and (max-width: 1499px) {
        grid-template-columns: repeat(2, 49%);
    }
    @media (min-width: 1050px) and (max-width: 1249px) {
        grid-template-columns: repeat(4, 24%);
    }
    @media (max-width: 1049px) {
        grid-template-columns: repeat(2, 49%);
    }
    ${CenterAlignment}
`;

export const TextWrapper = styled.span`
    padding: 0.25em 1.25em;
`
