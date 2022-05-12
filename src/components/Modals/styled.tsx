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


//   .modal {
//     width: 60rem;
//     padding: 4rem 2rem;
//     border-radius: .8rem;

//     color: var(--light);
//     background: var(--background);
//     box-shadow: .4rem .4rem 2.4rem .2rem hsla(236, 50%, 50%, 0.3);
//     position: relative;

//     overflow: hidden;
//   }

//   .modal__details {
//     text-align: center;

//     margin-bottom: 4rem;
//     padding-bottom: 4rem;
//     border-bottom: 1px solid hsla(0, 0%, 100%, .4);
//   }

//   .modal__title {
//     font-size: 3.2rem;
//   }
