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
    position: relative;
    width: 50%;
`;

export const Display = styled.div`
    width: 100%;
    height: 100%;
    background-color: gray;
`;

export const Photo = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const Form = styled.form`
    padding: 20px;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const Legend = styled.h1`
    text-align: center;
    margin-bottom: 50px;
`;

export const PageNavigator = styled.div`
    padding: 10px;
    bottom: 10px;
    left: 0;
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`;

export const ProfileContainer = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    margin: auto;
    margin-bottom: 10px;
    border: 0.5px solid #ccc;
`;

export const ProfilePhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const UploadText = styled.p`
    cursor: pointer;
    color: #1894FF;
    font-size: 15px;
`;

export const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
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

export const HelperContainer = styled.div`
    margin: 5px 10px;
`;

export const Helper = styled.p`
    font-size: 10px;
    color: #828282;
`;

export const Row = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
`;