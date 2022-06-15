import styled from "styled-components";
import { colors, properties } from "../../assets/theme";

export const LoadingBar = styled.div`
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -100%);
  width: 400px;
  height: 50px;
  border-radius: ${properties.radius.medium};
  background: ${colors.load.bar};
  border: 2px ridge;
`;

export const Progress = styled.div`
  width: ${(props: {progress: number}) => (props.progress*4) + 'px'};
  height: 50px;
  border-radius: ${properties.radius.medium};
  background: ${colors.load.progress};
  transition: width .5s ease-out;
`
