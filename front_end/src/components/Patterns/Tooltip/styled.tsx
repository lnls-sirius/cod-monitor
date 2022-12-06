import styled from "styled-components";
import {colors, properties} from "../../../assets/style/themes";

const TooltipText = styled.div`
    position: absolute;
    z-index: 1;
    visibility: hidden;
    font-size: 12px;
    min-width: 5em;
    background-color: ${colors.bg.primary50};
    color: ${colors.txt.primary};
    text-align: center;
    padding: 0.25em;
    border-radius: ${properties.radius.light};
    transform: translateY(-0.75em);
`

const TooltipWrapper = styled.div`
    &:hover ${TooltipText} {
        visibility: visible;
    }
` 

export {
    TooltipText,
    TooltipWrapper
}