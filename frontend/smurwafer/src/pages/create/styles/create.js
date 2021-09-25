import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

export const Wrapper = styled.div`
    width: 80%;
    height: 80%;
    margin: auto;
    margin-top: 3%;
    border: 0.2px solid #ccc;
    display: flex;
    flex-direction: row;
`;

export const Section = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const TitleSection = styled.div`
    display: block;
    padding: 20px;
    /* border-bottom: 0.2px solid #ccc;
    background-color: #fafafa; */
`;

export const Preview = styled.div`
    flex: 1;
`;

export const Board = styled.div`
    display: block;
    height: 85%;
    width: 100%;
`;

export const Display = styled.div`
    position: relative;
    width: 300px;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
    background-color: #d1d1d1;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Menu = styled.div`
    height: 15%;
    /* border-top: 0.2px solid #ccc; */
    white-space: nowrap;
    overflow-x: overlay;
    padding: 5px;
    align-items: center;
    justify-content: center;
`;

export const MenuItem = styled.div`
    display: inline-block;
    position: relative;
    height: 100%;
    margin-right: 5px;
    border: ${ ({ isActive }) => isActive ? '0.2px solid #1894ff' : '0.2px solid #ccc' } ;
    background-color: #d1d1d1;
    width: 75px;
    vertical-align: top;
`;

export const MenuPhoto = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    &:hover {
        filter: brightness(50%);
    }
`;

export const Editor = styled.div`
    height: 100%;
    border-left: 0.2px solid #ccc;
    padding: 20px;
    background-color: #fafafa;
`;

export const TagLegend = styled.h2`
    font-size: 16px;
    color: #787777;
`;

export const TagSection = styled.div`
    height: 15%;
    display: block;
    padding: 20px 0px;
`;

export const ButtonSection = styled.div`
    height: 15%;
    display: block;
    padding: 20px 0px;
`;

export const ModalContainer = styled.div``;

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ModalSection = styled.div`
    width: 50%;
`;

export const ModalDisplay = styled.div`
    border: 0.2px solid #ccc;
    border-radius: 5px;
    background-color: #eee;
    height: 200px;
    width: 200px;
    overflow: hidden;
`;

export const ModalPhoto = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;


export const ModalForm = styled.div`
    height: 100%;
`;

export const ModalUploadText = styled.p`
    cursor: pointer;
    color: #1894FF;
    font-size: 15px;
    margin: 0;
    margin-left: 5px;
`;

export const ModalFooter = styled.div`
    /* padding: 20px; */
    display: flex;
    flex-direction: row;
`;