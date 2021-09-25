import styled from 'styled-components/macro';

export const Container = styled.div`
    /* max-width: 800px; */
    width: 100%;
    height: 400px;
    margin: auto;
    margin-top: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    &:hover {
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    /* border: 0.2px solid #eee; */
    width: 100%;
    height: 100%;
`;

export const Section = styled.div`
    width: 50%;
`;

export const Display = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: gray;
    overflow: hidden;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Info = styled.div`
    padding: 10px;
    height: 100%;
`;

export const TitleSection = styled.div`
    align-items: center;
    border-bottom: 0.1px solid #eee;
`;

export const ContentSection = styled.div`
    height: 67%;
    padding: 10px 0px;
    border-bottom: 0.1px solid #eee;
    flex: 1;
`;

export const TagSection = styled.div`
    padding: 10px 0px;
    border-bottom: 0.1px solid #eee;
`;

export const ActionSection = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
    align-items: center;
    justify-content: space-evenly;
    height: 50px;
`;

export const ActionIcon = styled.div`
    /* margin-right: 40px; */
    cursor: pointer;

    &:hover {
        color: #1894FF;
    }
`;

export const Title = styled.h2`
    font-size: 19px;
`;

export const Content = styled.p`
    font-size: 16px;
`;

export const Tag = styled.p`
    font-size: 15px;
    color: #1894FF;
`;

export const CounterContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 30%;
    align-items: center;
    background: #fff;
    display: flex;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const CounterSection = styled.div`
    text-align: center;
    display: flex;
    margin: 5px 20px;
`;

export const CounterText = styled.p`
    font-size: 16px;
    margin: 0;
    color: ${ ({ color }) => color };
`;

export const AuthorContainer = styled.div`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: linear-gradient(
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0)
    );
    width: 100%;
`;

export const AuthorSection = styled.div``;

export const AuthorDisplay = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
`;

export const AuthorPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const AuthorText = styled.p`
    font-size: 15px;
    margin: 0;
    color:#fff;
`;