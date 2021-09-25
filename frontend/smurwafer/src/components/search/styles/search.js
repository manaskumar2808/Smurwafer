import styled from 'styled-components/macro';

export const Container = styled.div`
    position: relative;
    width: 85%;
    margin-left: 11.5%;
`;

export const ResultContainer = styled.div`
    width: 100%;
    position: absolute;
    top: 33px;
    display: block;
    z-index: 300;
    background-color: #fff;
    padding: 20px;
    /* border: 0.2px solid #ccc; */
     box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12)
`;

export const Result = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: ${ ({ active }) => active ? '#eee' : '#fff' };
`;

export const Section = styled.div``;

export const Display = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
`;

export const Photo = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const TitleContainer = styled.div`
    align-items: center;
`;

export const Title = styled.p`
    font-size: 14px;
    margin: 0;
`;