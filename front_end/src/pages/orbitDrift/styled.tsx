import styled from "styled-components";
import { HorizontalOrient, VerticalOrient } from "../../assets/style/gen_styles";
import {colors, fonts} from '../../assets/style/themes';

const AppLayout = styled.div`
    font-family: ${fonts.primary};
    background: ${colors.bg.primary};
`;

const HorizontalWrapper = styled.div`
    ${HorizontalOrient}
`;

const VerticalWrapper = styled.div`
    ${VerticalOrient}
`;

const GridWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 65% 34%;
    @media (max-width: 1250px) {
        grid-template-columns: 100%;
    }
`

export {
    AppLayout,
    HorizontalWrapper,
    VerticalWrapper,
    GridWrapper
}