import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    @media (min-width: 1025px) {
        grid-template-columns: repeat(5, 20%);
    }
    @media (min-width: 850px) and (max-width: 1024px) {
        grid-template-columns: repeat(4, 25%);
    }
    @media (max-width: 849px) {
        grid-template-columns: repeat(2, 50%);
    }
    align-items: center;
    justify-content: center;
`;

export const TextWrapper = styled.span`
    padding: 0.25em 1.25em;
`
