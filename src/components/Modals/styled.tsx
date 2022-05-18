import styled, { keyframes } from "styled-components";
import {colors, properties, fonts} from "../../assets/theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal} from "react-bootstrap";

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
    min-width: 60rem;
    border-radius: ${properties.radius.medium};
    background: ${colors.bg.white};
`

export const Header = styled.div`
    width: 100%;
    background-image: ${colors.bg.secondary};
    color: ${colors.txt.primary};
    text-align: center;
    justify-content: center;
    padding: 15px 0px;
    font-family: ${fonts.primary};
    font-weight: 900;
    font-size:${fonts.size.medium};
    border-radius: ${properties.radius.medium} ${properties.radius.medium} 0px 0px;
`;

export const Body = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
`;

export const Footer = styled.div`
    text-align: center;
    padding-bottom: 15px;
`;

export const Close = styled(FontAwesomeIcon)`
    padding: 5px;
    color: ${colors.bg.white};
    border-radius: ${properties.radius.extlight};
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: .2s;
    &:hover{
        background-color: ${colors.btns.btn1.hover};
        border-color: hsla(0, 0%, 100%, .6);
        transform: translateY(-.2rem);
    }
    &:active{
        background-color: ${colors.btns.btn1.active};
    }
`
