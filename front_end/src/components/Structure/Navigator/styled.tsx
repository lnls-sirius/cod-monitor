import styled from "styled-components";
import {Link} from 'react-router-dom';
import {colors, properties} from '../../../assets/themes';
import { AnimButton2 } from "../../../assets/gen_styles";


export const NavWrapper = styled.nav`
    display: flex;
    width: 30%;
    justify-content: center;
    align-items: center;
`;

export const PageLink = styled(Link)`
    ${AnimButton2}
    text-decoration: none;
    border-radius: ${properties.radius.medium};
    padding: 0.5em;
    margin: 0.25em;
`

export const PageAct = styled.span`
    color: ${colors.txt.primary};
    text-decoration: none;
    text-align: center;
    padding: 5px;
    margin: 5px;
    border-radius: ${properties.radius.medium};
    background-color: ${colors.btns.btn2.normal};
`
