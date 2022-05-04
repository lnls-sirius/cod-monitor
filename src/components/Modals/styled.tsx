import styled from "styled-components";
import { colors} from "../../assets/theme";
import {Modal} from "react-bootstrap";

export const ModalContainer = styled(Modal)`
    background-color: ${colors.bg.primary50};
`;

export const Header = styled.div`
    background-image: ${colors.bg.secondary};
    color: ${colors.txt.primary};
    text-align: center;
`;

export const Body = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    style={{ zIndex: 50 }}
`;

export const Footer = styled.div`
    text-align: center;
    padding-bottom: 15px;
`;
