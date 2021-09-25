import styled from 'styled-components/macro';

export const Container = styled.div`
    cursor: pointer;
    display: inline-block;
    margin: 0px 5px;
    width: 150px;

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }
`;

export const Wrapper = styled.div`
    cursor: pointer;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${ ({ isActive = false }) => isActive ? '#1894FF' : '#FFF' };
    border-radius: 50px;
    border: ${ ({ isActive = false }) => isActive ? '0px solid #ccc' : '0.5px solid #ccc' };
    padding: 5px 10px;
`;

export const Text = styled.p`
    color: ${ ({ isActive = false }) => isActive ? '#FFF' : '#000' };
    text-transform: capitalize;
    font-size: 17px;
    margin: 0;
`;