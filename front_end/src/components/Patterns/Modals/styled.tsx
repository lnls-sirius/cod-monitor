import styled, { keyframes, css } from "styled-components";
import {colors, properties, fonts} from "../../../assets/style/themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimButton } from "../../../assets/style/gen_styles";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ModalStyles: any = {
    'normal': {
        'container': css`
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: ${colors.bg.primary50};
        `,
        'content': css`
            background: ${colors.bg.white};
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            min-width: 1em;
        `,
        'body': css`
            min-width: 58em;
            padding: 1.5em;
        `,
        'header': css`
            background-image: ${colors.bg.secondary};
            padding: 0.75em 0em;
        `,
        'close': css`
            top: 0.75em;
            right: 1.25em;
            padding: 0.25em;
        `,
    },
    'alert': {
        'container': css`
            right: 0.5em;
            top: 1em;
            width: 15em;
            item-align: center;
        `,
        'content': css`
            background: ${colors.bg.primary50};
        `,
        'body': css`
            width: 15em;
            font-size:${fonts.size.small};
            padding: 0.5em;
        `,
        'header': css`
            width: 15em;
            background: ${colors.bg.alert};
            padding: 0.25em 0em;
        `,
        'close': css`
            top: 1.25em;
            right: 2em;
            padding: 0.25em;
        `,
    }
}

export const ModalContainer = styled.div`
    z-index: 1;
    position: fixed;
    ${(props: { styling: string, show: boolean})=>ModalStyles[props.styling].container};
    animation: ${(props: { styling: string, show: boolean})=>props.show?fadeIn:''} 0.3s linear;
`

export const Content = styled.div`
    position: fixed;
    border-radius: ${properties.radius.medium};
    ${(props: { styling: string; }) =>
        ModalStyles[props.styling].content}
`

export const Header = styled.div`
    ${(props: { styling: string; }) =>
        ModalStyles[props.styling].header};
    color: ${colors.txt.primary};
    text-align: center;
    justify-content: center;
    font-family: ${fonts.primary};
    font-weight: 900;
    border-radius: ${properties.radius.medium} ${properties.radius.medium} 0px 0px;
`;

export const Body = styled.div`
    ${(props: { styling: string; }) =>
        ModalStyles[props.styling].close};
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const Close = styled(FontAwesomeIcon)`
    position: fixed;
    ${(props: { styling: string; }) =>
        ModalStyles[props.styling].close};
    ${AnimButton}
`
