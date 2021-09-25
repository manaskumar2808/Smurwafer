import styled from 'styled-components/macro';

export const Container = styled.div`
    overflow: scroll;
    height: 100vh;
`;

export const Wrapper = styled.div`
    width: 80%;
    margin: auto;
`;

export const Legend = styled.h1`
    text-transform: capitalize;
`;

export const Author = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const AuthorDisplay = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 100%;
    border: 0.2px solid #ccc;
    background-color: #eee;
    overflow: hidden;
`;

export const AuthorPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const AuthorText = styled.p`
    font-size: 14px;
    color: #1894FF;
    margin: 0;
`;

export const GalleryContainer = styled.div`
    width: 150px;
    height: 150px;
    border: 0.2px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    background-color: #eee;
`;

export const GalleryPhoto = styled.img`
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Title = styled.p`
    cursor: pointer;
    font-size: 15px;
    color: #434343;
    margin: 0;
`;

export const Index = styled.p`
    cursor: pointer;
    font-size: 15px;
    color: #1894FF;
    margin: 0;
`;