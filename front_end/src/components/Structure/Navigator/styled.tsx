import styled from "styled-components";
import {Link} from 'react-router-dom';
import { properties } from '../../../assets/style/themes';
import { AnimButton2, CenterAlignment } from "../../../assets/style/gen_styles";


const NavWrapper = styled.nav`
    display: flex;
    width: 30%;
    ${CenterAlignment}
`;

const PageLink = styled(Link)`
    ${AnimButton2}
    text-decoration: none;
    border-radius: ${properties.radius.medium};
    padding: 0.5em;
    margin: 0.25em;
`

export {
    NavWrapper,
    PageLink
}
