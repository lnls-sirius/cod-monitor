import styled from "styled-components";
import {colors, fonts} from '../../assets/theme';

export const AppLayout = styled.div`
    height: 100vh;
    width: 100%;
    font-family: ${fonts.primary};
    background-image: ${colors.bg.primary};
`;

export const HeaderWrapper = styled.nav`
    width: 100%;
    display: flex;
`;