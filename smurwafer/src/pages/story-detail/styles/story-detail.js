import styled from 'styled-components/macro';

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    /* overflow: auto; */
    position: fixed;
`;

export const LoaderContainer = styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
`;

export const Wrapper = styled.div`
    display: flex;
`;

export const Title = styled.h1`
    font-size: 35px;
    text-align: center;
    ::first-letter {
        color: #1894FF;
    }
`;

export const Text = styled.p`
    font-size: 16px;
    white-space: pre-line;
`;

export const Display = styled.div`
    height: 400px;
    width: 500px;
    margin: auto;
    border: 0.2px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    background-color: #000;
`;

export const Photo = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
`;

export const Section = styled.div`
    width: ${ ({ width }) => width + '%' };
    padding: 0px 40px;
`;

export const StoryWrapper = styled.div`
    width: 80%;
    margin: auto;
    justify-content: center;
    overflow: auto;
    height: 100vh;
    padding-top: 40px;
`;

export const StoryArea = styled.div`
    margin-top: 30px;
`;

export const CommentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 0.2px solid #ccc;
    height: 600px;
    margin-top: 40px;
`;

export const CommentEmpty = styled.div`
    width: 100%;
    margin-top: 150px;
`;

export const CommentArea = styled.div`
    height: 90%;
    padding: 20px;
    overflow: auto;
`;

export const CommentInputSection = styled.div`
    height: 10%;
    padding: 10px;
    align-items: center;
`;

export const CommentHeader = styled.div`
    height: 10%;
    padding: 10px 20px;
    border-bottom: 0.2px solid #ccc;
    align-items: center;
    justify-content: space-between;
    display: flex;
    background-color: #f0f0f0;
`;

export const CommentTitle = styled.h2`
    font-size: 17px;
    margin: 0;
`;

export const CommentItem = styled.div`
    display: flex;
`;

export const CommentProfileSection = styled.div`
    width: 15%;
`;

export const CommentProfileContainer = styled.div`
    cursor: pointer;
    border-radius: 100%;
    height: 40px;
    width: 40px;
    overflow: hidden;
    border: 0.2px solid #ccc;
`;

export const CommentProfile = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const CommentTextContainer = styled.div`
    width: 80%;
    align-items: center;
`;

export const CommentText = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const Commentor = styled.p`
    cursor: pointer;
    font-size: 14px;
    color: #1894FF;
    margin: 0;
`;

export const CommentTimeContainer = styled.div`
    align-items: flex-start;  
`;

export const CommentTime = styled.p`
    font-size: 10px;
    color: #8a8787;
`;

export const CommentActionContainer = styled.div`
    width: 5%;
    align-items: center;
`;

export const ActionSection = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
    align-items: center;
    justify-content: space-evenly;
    height: 70px;
    margin-top: 40px;
    border-top: 0.2px solid #d1d1d1;
    border-bottom: 0.2px solid #d1d1d1;
`;

export const ActionIcon = styled.div`
    /* margin-right: 40px; */
    cursor: pointer;

    &:hover {
        color: #1894FF;
    }
`;


export const GalleryList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 40px 0px; 
`;

export const GalleryItem = styled.div`
    margin: 0px 20px;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    display: block;
    border: ${ ({ active }) => !active ? '0.2px solid #ccc' : '2px solid #1894ff' };
    overflow: hidden;

    &:hover {
        filter: brightness(50%);
    }
`;

export const GalleryPhoto = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const Player = styled.div`
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    height: 100%;
    width: 100%;
    text-align: center;
    vertical-align: middle;
`;