import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
`;

export const Brand = styled.div`
    @font-face {
        font-family: 'Pacifico';
        src: url('./fonts/Pacifico/Pacifico-Regular.ttf');
    }

    cursor: pointer;
    font-family: 'Pacifico';
    font-size: 40px;
    margin-top: 20%;

    &::first-letter {
        color: #1890FF;
    }
`;