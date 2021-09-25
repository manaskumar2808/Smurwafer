import styled from 'styled-components/macro';

export const Container = styled.div`
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    margin: auto;
    /* width: 80%; */
`;

export const List = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
`;

export const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Legend = styled.h3`
    /* margin-left: 10px; */
`;

export const Section = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

export const Cover = styled.div`
    width: 75px;
    height: 75px;
`;

export const Display = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    background-color: #eee;
    border: 0.2px solid #eee;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const NameContainer = styled.div`
    margin: 5px;
`;

export const Name = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const Dot = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    height: 5px;
    width: 5px;
    border-radius: 100%;
    z-index: 100;
    color: ${ ({ self }) => self ? "#1894ff" : "#0ed104" };
`;