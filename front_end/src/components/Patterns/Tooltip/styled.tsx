import styled from "styled-components";
import { StateInterface } from "../../../assets/interfaces/patterns";
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
    ${(props: StateInterface) => 
        props.state?
        'transform: translateY(-0.5em)':''} 
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