import styled from 'styled-components/macro';

export const Container = styled.div`
    border-radius: 5px;
    border: 0.2px solid #ccc;
    justify-content: center;
    padding: 10px;
    margin: 0px 0px 0px 40px;
    width: 170px;
`;

export const Display = styled.div`
    width: 100%;
    height: 120px;
    border: 0.2px solid #ccc;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Section = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

export const Text = styled.p`
    font-size: 16px;
`;