import styled, { keyframes } from "styled-components";
import { colors, properties } from "../../../assets/theme";

const BounceAnimation = keyframes`
  0% {
    width: 1rem;
    height: 1rem;
  }

  50% {
    width: 2rem;
    height: 2rem;
  }

  100% {
    width: 1rem;
    height: 1rem;
  }
`

export const LoadingWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  height: 3rem;
  transform: translate(-50%, -100%);
`

export const Circle = styled.div`
  margin: 5px;
  width: 1rem;
  height: 1rem;
  border-radius: ${properties.radius.high};
  background: ${colors.led.load};
  animation: ${BounceAnimation} 2s linear infinite;
  animation-delay: ${(props: { delay: string; }) => props.delay};
`
