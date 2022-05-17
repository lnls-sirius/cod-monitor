import styled from "styled-components";
import {colors, fonts} from '../../assets/theme';

export const AppLayout = styled.div`
    font-family: ${fonts.primary};
    background: ${colors.bg.primary};
`;

export const HeaderWrapper = styled.nav`
    width: 100%;
    display: flex;
`;
