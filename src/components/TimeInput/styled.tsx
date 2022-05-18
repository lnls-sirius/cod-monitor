import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fonts, properties } from "../../assets/theme";

export const InputTime = styled(DatePicker)`
    margin: 0 .5rem;
    font-family: ${fonts.primary};
    font-size: ${fonts.size.small};
    height: 1.2rem;
    width: 5.5rem;
    border-radius: ${properties.radius.light};
`;
