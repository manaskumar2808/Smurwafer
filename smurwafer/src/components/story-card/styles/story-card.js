import styled from 'styled-components/macro';

export const Container = styled.div`
    display: inline-block;
    border: 0.2px solid #ccc;
    justify-content: center;
    padding: 10px;
    margin: 0px 0px 40px 40px;
    width: 250px;
`;

export const Display = styled.div`
    position: relative;
    width: 100%;
    height: 150px;
    border: 0.2px solid #ccc;
`;

export const IconSection = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #fff;
    height: 20px;
    width: 20px;
    border-radius: 100%;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Section = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.h3`
    max-height: 40px;
    text-overflow: ellipsis;
`;

export const Text = styled.p`
`;