import styled from 'styled-components/macro';

export const Container = styled.div`
    margin-top: 40px;
`;

export const Wrapper = styled.div`
    margin: auto;
    border: 0.2px solid #eee;
    border-radius: 5px;
    width: 80%;
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.p`
    font-size: 15px;
    margin: 0;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Display = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    background-color: #eee;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const NameContainer = styled.div`
    margin: 10px 0px;
`;

export const Name = styled.h3`
    font-size: 17px;
`;

export const Link = styled.div``;
