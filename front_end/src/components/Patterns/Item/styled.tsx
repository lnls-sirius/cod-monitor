import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AnimButton } from "../../../assets/gen_styles";
import { colors, fonts, properties } from "../../../assets/themes";
import { IconStyle } from "../../../controllers/Patterns/interfaces";

export const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25em;
    font-family: ${fonts.primary};
`;

export const Icon = styled(FontAwesomeIcon)`
    height: ${(
        (props: IconStyle)=>
            props.small?
                properties.size.small:
                properties.size.normal)};
    margin: ${(
        (props: IconStyle)=>
            props.small?'0':'0.1')}em;
    padding: 0.1em ${(
        (props: IconStyle)=>
            props.small?'0.2':'0.25')}em;
    color: ${colors.bg.white};
    border-radius: ${properties.radius.extlight};
    background-color: ${(
        (props: IconStyle)=>
            props.state?
                colors.bg.transparent:
                colors.btns.btn2.normal)};
    ${AnimButton}
`;
