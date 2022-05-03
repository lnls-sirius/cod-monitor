import styled from "styled-components";
import { colors} from "../../assets/theme";
import {Modal} from "react-bootstrap";

export const ModalWrapper = styled(Modal)`

`;

export const Header = styled.div`
    background-image: ${colors.bg.secondary};
    color: ${colors.txt.primary};
    text-align: center;
`;

export const Title = styled.div`

`;

export const Footer = styled.div`
    text-align: center;
`;
