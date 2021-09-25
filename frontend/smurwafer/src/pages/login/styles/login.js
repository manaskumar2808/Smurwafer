import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Wrapper = styled.div`
    height: 400px;
    width: 750px;
    display: flex;
    margin: auto;
    margin-top: 10%;
    border: 0.5px solid #ccc;
`;

export const Section = styled.div`
    width: 50%;
    height: 100%;
`;

export const Form = styled.form`
    padding: 20px;
    justify-content: center;
    align-items: center;
`;

export const Legend = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const SwitchText = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const SwitchLink = styled.p`
    cursor: pointer;
    font-size: 14px;
    margin: 0;
    color: #1894FF;
`;