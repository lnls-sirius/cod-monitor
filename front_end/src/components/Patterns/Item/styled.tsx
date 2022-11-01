import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AnimButton } from "../../../assets/style/gen_styles";
import { colors, fonts, properties } from "../../../assets/style/themes";
import { IconStyle } from "../../../assets/interfaces/patterns";

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
                colors.btns.btn1.normal)};
    ${AnimButton}
`;
