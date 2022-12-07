import styled from "styled-components";
import { HorizontalOrient, VerticalOrient } from "../../assets/style/gen_styles";
import {colors, fonts} from '../../assets/style/themes';

const AppLayout = styled.div`
    font-family: ${fonts.primary};
    background: ${colors.bg.primary};
`;

const VerticalWrapper = styled.div`
    ${VerticalOrient}
`;

const HorizontalWrapper = styled.div`
    ${HorizontalOrient}
`;

const MenuWrapper = styled.div`
    @media (max-width: 1000px) {
        display: none;
    }
`

export {
    AppLayout,
    VerticalWrapper,
    HorizontalWrapper,
    MenuWrapper
}