import styled from "styled-components";
import { CenterAlignment } from "../../assets/style/gen_styles";
import {colors, fonts} from '../../assets/style/themes';

export const AppLayout = styled.div`
    height: 100%;
    font-family: ${fonts.primary};
    background: ${colors.bg.primary};
`;

export const VerticalWrapper = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${CenterAlignment}
`;

export const HorizontalWrapper = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: row;
    ${CenterAlignment}
`;
