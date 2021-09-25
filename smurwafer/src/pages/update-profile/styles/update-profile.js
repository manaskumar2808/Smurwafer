import styled from 'styled-components/macro';

export const Container = styled.div`
    
`;

export const Wrapper = styled.div`
    border: 0.2px solid #ccc;
    margin: auto;
    margin-top: 5%;
    width: 80%;
    padding: 40px;
    height: 600px;
`;

export const UserInfoWrapper = styled.div``;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto;
    margin-top: 5%;
    width: 60%;
`;

export const Section = styled.div`
    /* width: ${ ({ width }) => width + '%' }; */
    width: 50%;
`;

export const Display = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 5px;
    border: 0.2px solid #ccc;
    overflow: hidden;
    background: #d1d1d1;
`;

export const Photo = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const UploadText = styled.p`
    cursor: pointer;
    color: #1894FF;
    font-size: 15px;
`;

export const BioContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const BioWrapper = styled.div`
    width: 60%;
    height: 100%;
    margin: auto;
    margin-top: 3%;
    display: flex;
    flex-direction: column;
`;

export const ThemeContainer = styled.div`
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
`;

export const ThemeWrapper = styled.div`
    width: 80%;
    height: 100%;
    margin: auto;
`;

export const ThemeBox = styled.div`
    width: 100%;
    height: 120px;
    background-color: #d1d1d1;
    border-radius: 5px;
    overflow: hidden;
    margin: auto;
    margin-top: 7%;
`;

export const Theme = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const DateContainer = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
`;

export const DateWrapper = styled.div`
    width: 50%;
    height: 100%;
    margin: auto;
    margin-top: 10%;
    display: flex;
    flex-direction: column;    
`;

export const PasswordWrapper = styled.div`
    width: 50%;
    height: 100%;
    margin: auto;
    margin-top: 7%;
    display: flex;
    flex-direction: column;    
`;