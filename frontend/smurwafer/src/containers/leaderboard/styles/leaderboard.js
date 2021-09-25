import styled from 'styled-components/macro';

export const Container = styled.div`
    margin-top: 20px;
    margin-right: 20px;
`;

export const Wrapper = styled.div`
    border: 0.2px solid #eee;
    height: 300px;
    justify-content: center;
`;

export const LoaderContainer = styled.div`
    margin-left: 45%;
    margin-top: 50%;
`;

export const ListItem = styled.div`
    cursor: pointer;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Section = styled.div``;

export const Display = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 100%;
    overflow: hidden;
    background-color: #eee;
`;

export const Photo = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const UserNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const UserName = styled.p`
    font-size: 15px;
    margin: 0;
`;

export const RatingContainer = styled.div`
    width: 30%;
`;

export const Rating = styled.p`
    font-size: 15px;
    color: #1894FF;
    margin: 0;
`;