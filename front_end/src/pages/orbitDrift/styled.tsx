import styled from "styled-components";
import { CenterAlignment } from "../../assets/style/gen_styles";
import {colors, fonts} from '../../assets/style/themes';

export const AppLayout = styled.div`
    font-family: ${fonts.primary};
    background: ${colors.bg.primary};
`;

export const VerticalWrapper = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${CenterAlignment}
`;

export const GridWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 65% 34%;
    @media (max-width: 1250px) {
        grid-template-columns: 100%;
    }
`

export const HorizontalWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    ${CenterAlignment}
`;
