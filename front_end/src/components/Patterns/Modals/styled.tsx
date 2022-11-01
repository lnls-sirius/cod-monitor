import styled, { keyframes } from "styled-components";
import {colors, properties, fonts} from "../../../assets/style/themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal} from "react-bootstrap";
import { AnimButton } from "../../../assets/style/gen_styles";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const ModalContainer = styled(Modal)`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${colors.bg.primary50};
    animation: ${(props)=>props.show?fadeIn:fadeOut} 0.3s linear;
`

export const Content = styled.div`
    position: fixed;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%);
    min-width: 60em;
    border-radius: ${properties.radius.medium};
    background: ${colors.bg.white};
`

export const Header = styled.div`
    background-image: ${colors.bg.secondary};
    color: ${colors.txt.primary};
    text-align: center;
    justify-content: center;
    padding: 0.75em 0px;
    font-family: ${fonts.primary};
    font-weight: 900;
    font-size:${fonts.size.medium};
    border-radius: ${properties.radius.medium} ${properties.radius.medium} 0px 0px;
`;

export const Body = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5em;
`;

export const Close = styled(FontAwesomeIcon)`
    position: absolute;
    top: 0.75em;
    right: 1.25em;
    padding: 0.25em;
    ${AnimButton}
`
