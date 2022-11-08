import styled, { keyframes } from "styled-components";
import { colors, properties } from "../../../assets/style/themes";

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
  height: 3rem;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
`

export const Circle = styled.div`
  margin: 5px;
  width: 1rem;
  height: 1rem;
  border-radius: ${properties.radius.high};
  background: ${colors.led.load};
  animation: ${BounceAnimation} 1.5s linear infinite;
  animation-delay: ${(props: { delay: string; }) => props.delay};
`
