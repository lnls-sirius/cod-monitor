import styled from "styled-components";
import {colors, fonts} from '../../assets/theme';

export const AppLayout = styled.div`
    font-family: ${fonts.primary};
    background: ${colors.bg.primary};
`;

export const VerticalWrapper = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const HorizontalWrapper = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: row;
    item-align: center;
    justify-content: center;
`;
