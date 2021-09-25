import styled from 'styled-components/macro';

export const Container = styled.div`
    overflow: scroll;
    max-height: 100vh;
`;

export const LoaderContainer = styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
`;

export const Wrapper = styled.div`
    margin: auto;
    margin-top: 20px;
    width: 80%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 1;
    grid-row-gap: 1;
    columns: 3;
`;