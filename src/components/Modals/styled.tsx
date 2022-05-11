import styled from "styled-components";
import {colors, properties} from "../../assets/theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal} from "react-bootstrap";

export const ModalContainer = styled(Modal)`
    background-color: ${colors.bg.primary50};
`;

export const Header = styled.div`
    background-image: ${colors.bg.secondary};
    color: ${colors.txt.primary};
    text-align: center;
    justify-content: center;
    padding: 10px 0px;
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
    &:hover{
        background-color: ${colors.btns.btn1.hover};
    }
    &:active{
        background-color: ${colors.btns.btn1.active};
    }
`
