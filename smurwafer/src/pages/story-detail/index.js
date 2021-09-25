import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import axios from '../../axios-config';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Title, Text, Section, Wrapper, StoryWrapper, StoryArea, Display, Photo, LoaderContainer, CommentWrapper, CommentHeader, CommentTitle, CommentArea, CommentInputSection, ActionIcon, ActionSection, GalleryList, GalleryItem, GalleryPhoto, CommentItem, CommentProfileContainer, CommentProfile, CommentTextContainer, CommentText, CommentTime, CommentTimeContainer, CommentProfileSection, Commentor, CommentActionContainer, Player, CommentEmpty } from './styles/story-detail';
import { ArrowDownOutlined, ArrowUpOutlined, BookOutlined, DeleteOutlined, PlayCircleOutlined, RedoOutlined, SendOutlined, ShareAltOutlined } from '@ant-design/icons';
import { FiFilm } from 'react-icons/fi';
import { header } from '../../utility/header';
import { Input, message, Spin, Empty } from 'antd';
import { useHistory, useParams } from 'react-router';
import { baseUrl } from '../../utility/base-url';
import Footer from '../../components/footer';
import * as actions from '../../store';
import { galleryUrl } from '../../utility/media-url';
import ReactPlayer from 'react-player';

const StoryDetailPage = props => {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.id);

    const { closeSidebar } = props;
    const { id } = params;

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);

    const [story, setStory] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [displayUrl, setDisplayUrl] = useState();
    const [displayType, setDisplayType] = useState('image');
    
    const [votes, setVotes] = useState(0);
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [comments, setComments] = useState([]);
    const [userNames, setUserNames] = useState([]);

    const [text, setText] = useState('');

    const fetchVote = useCallback(async () => {
        const response = await axios.get('api/vote/' + id, header(token));

        if (response.status !== 200) {
            return;
        }

        const { votes, vote } = response.data;

        if (vote) {
            if (vote.type === 'up') {
                setUpVote(true);
            } else {
                setDownVote(true);
            }
        }
        setVotes(votes);
    }, [id, token]);

    const fetchComments = useCallback(async () => {
        const response = await axios.get('api/comment/' + id, header(token));

        if (response.status !== 200) {
            return;
        }

        const { comments } = response.data;

        setComments(comments);
        
        const map = new Map();

        const loadedUserNames = [];

        for (let key in comments) {
            const comment = comments[key];
            const uN = comment.commentor.userName;
            if (!map.has(uN)) {
                map.set(uN, comment.commentor);
                loadedUserNames.push(uN);
            }
        }

        setUserNames(loadedUserNames);
    }, [token, id]);

    const fetchIsBookmarked = useCallback(async () => {
        const response = await axios.get('api/bookmark/is-bookmarked/' + id, header(token));
        
        if (response.status !== 200) {
            setIsLoading(false);
            return;
        }
        
        const { isBookmarked } = response.data;
        setIsBookmarked(isBookmarked);
    }, [token, id]);

    const fetchStory = useCallback(async () => {
        const response = await axios.get('api/story/' + id, header(token));

        if (response.status !== 200) {
            return;
        }

        setStory(response.data.story);
        const galleryData = response.data.story.gallery;
        if (galleryData.length > 0) {
            setDisplayUrl(galleryUrl(galleryData[0]));
            setDisplayType(galleryData[0].type);
        }

        await fetchVote();
        await fetchComments();
        await fetchIsBookmarked();
        setIsLoading(false);
    }, [token, id, fetchVote, fetchComments, fetchIsBookmarked]);


    const bookmark = () => {
        if (isBookmarked) {
            setIsBookmarked(false);
            dispatch(actions.deleteBookmark(token, id))
                .then(result => {
                    message.success('Unbookmarked the story ' + story.title);
                }).catch(error => {
                    setIsBookmarked(true);
                    message.error('Cannot unbookmark ' + story.title + ' at the moment!');
                });
        } else {
            setIsBookmarked(true);
            const bookmarkData = {
                id,
                category: 'history',
            };
            
            dispatch(actions.addBookmark(token, bookmarkData))
                .then(result => {
                    message.success('Bookmarked the story ' + story.title);
                }).catch(error => {
                    setIsBookmarked(false);
                    message.error('Cannot bookmark ' + story.title + ' at the moment!');
                });
        }
    }

    useEffect(() => {
        fetchStory();
    }, [fetchStory]);


    const handleVote = async (type = 'up') => {
        if (type === 'up') {
            if (downVote) {
                setDownVote(false);
                const response = await axios.delete('api/vote/' + id, header(token));
    
                if (response.status !== 202) {
                    setDownVote(true);
                    return;
                }
            } 

            if (upVote) {
                setUpVote(false);
                const response = await axios.delete('api/vote/' + id, header(token));
    
                if (response.status !== 202) {
                    setUpVote(true);
                    return;
                }
            } else {
                setUpVote(true);
                const response = await axios.post('api/vote', {
                    type, id
                }, header(token));
    
                if (response.status !== 201) {
                    setUpVote(false);
                    return;
                }
            }
        } else {
            if (upVote) {
                setUpVote(false);
                const response = await axios.delete('api/vote/' + id, header(token));
    
                if (response.status !== 202) {
                    setUpVote(true);
                    return;
                }
            }
            
            if (downVote) {
                setDownVote(false);
                const response = await axios.delete('api/vote/' + id, header(token));
    
                if (response.status !== 202) {
                    setDownVote(true);
                    return;
                }
            } else {
                setDownVote(true);
                const response = await axios.post('api/vote', {
                    type, id
                }, header(token));
    
                if (response.status !== 201) {
                    setDownVote(false);
                    return;
                }
            }
        }
    }

    const handleCommentPost = async (e) => {
        if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
            if(text.trim().length === 0) {
                return;
            }
    
            const response = await axios.post('api/comment', {
                text,
                id,
            }, header(token));
    
            if (response.status !== 201) {
                return;
            }
    
            setText('');
            await fetchComments();
        }
    }
    
    const handleCommentDelete = async (commentId) => {
        try {
            await axios.delete('api/comment/' + commentId, header(token));
     
             await fetchComments();
             message.success('Comment deleted successfully');
        } catch (err) {
            if (err.response) {
                message.error(err.response.data.message);
            } else {
                message.error('Cannot delete comment at the moment!');
            }
        }
    }

    const goToProfileView = (id) => {
        history.push('/profile-view/' + id);
    }

    const handleDisplay = (gallery) => {
        setDisplayUrl(galleryUrl(gallery));
        setDisplayType(gallery.type);
    }


    if (isLoading) {
        return (
            <LoaderContainer>
                <Spin size="large" style={{ position: "absolute", top: "45%", left: "45%" }} />
            </LoaderContainer>
        );
    }

    return (
        <Container>
            <Wrapper>
                <Section width={67}>
                    <StoryWrapper>
                        <Title>
                            {story.title}
                        </Title>
                        <Display>
                            {
                                displayType === 'image' ?
                                    <Photo src={displayUrl} /> :
                                    <ReactPlayer
                                        url={displayUrl}
                                        height={400}
                                        width={500}
                                        controls
                                    />
                            }
                        </Display>
                        <GalleryList>
                            {
                                story.gallery.map(g => {
                                    return (
                                        <GalleryItem active={displayUrl === galleryUrl(g)} onClick={() => handleDisplay(g)} key={g.id}>
                                            {
                                                g.type === 'image' ?
                                                    <GalleryPhoto src={galleryUrl(g)} /> :
                                                    <Player>
                                                        <FiFilm color={"#1894FF"} size={30} style={{ color: "#1894FF", fontSize: 30, marginTop: 23 }} />
                                                    </Player>
                                            }
                                        </GalleryItem>
                                    );
                                })
                            }
                        </GalleryList>
                        <ActionSection>
                            <ActionIcon>
                                { upVote ? <ArrowUpOutlined style={{ fontSize: 19, color: "#32a852" }} onClick={() => handleVote('up')} /> : <ArrowUpOutlined style={{ fontSize: 19 }} onClick={() => handleVote('up')} /> }
                            </ActionIcon>
                            <ActionIcon>
                                { downVote ? <ArrowDownOutlined style={{ fontSize: 19, color: "#c41108" }} onClick={() => handleVote('down')} /> : <ArrowDownOutlined style={{ fontSize: 19 }} onClick={() => handleVote('down')} />}
                            </ActionIcon>
                            <ActionIcon>
                                <ShareAltOutlined style={{ fontSize: 19 }} />
                            </ActionIcon>
                            <ActionIcon>
                                { isBookmarked ? <BookOutlined style={{ fontSize: 19, color: "#1894ff" }} onClick={bookmark} /> : <BookOutlined style={{ fontSize: 19 }} onClick={bookmark} /> }
                            </ActionIcon>
                        </ActionSection>
                        <StoryArea>
                            <Text>
                                {story.text}
                            </Text>
                        </StoryArea>
                        <Footer />
                    </StoryWrapper>
                </Section>
                <Section width={33}>
                    <CommentWrapper>
                        <CommentHeader>
                            <CommentTitle>
                                Comments
                            </CommentTitle>
                            <RedoOutlined onClick={fetchComments} style={{ color: "#1894FF", cursor: "pointer" }} />
                        </CommentHeader>
                        <CommentArea>
                            {
                                comments && comments.length > 0 ?
                                comments.map(comment => {
                                    return (
                                        <CommentItem key={comment.id}>
                                            <CommentProfileSection>
                                                <CommentProfileContainer onClick={() => goToProfileView(comment.commentor.id)}>
                                                    <CommentProfile src={baseUrl + comment.commentor.imageUrl} />
                                                </CommentProfileContainer>
                                            </CommentProfileSection>
                                            <CommentTextContainer>
                                                <Commentor onClick={() => goToProfileView(comment.commentor.id)}>
                                                    {comment.commentor.userName}
                                                </Commentor>
                                                <CommentText>
                                                    {comment.text}
                                                </CommentText>
                                                <CommentTimeContainer>
                                                    <CommentTime>
                                                        {moment(comment.createdAt).fromNow()}
                                                    </CommentTime>
                                                </CommentTimeContainer>
                                            </CommentTextContainer>
                                            <CommentActionContainer>
                                                { userId === comment.commentor.id && <DeleteOutlined onClick={() => handleCommentDelete(comment.id)} style={{ cursor: "pointer", color: "#ff0000" }} size={17} />}
                                            </CommentActionContainer>
                                        </CommentItem>
                                    );
                                })
                                    :
                                    <CommentEmpty>
                                        <Empty description="No comments yet" />
                                    </CommentEmpty>
                            }
                        </CommentArea>
                        <CommentInputSection>
                            <Input value={text} onChange={e => setText(e.target.value)} addonAfter={<SendOutlined onClick={handleCommentPost} />} onKeyDown={handleCommentPost} placeholder="Text your comment..." />
                        </CommentInputSection>
                    </CommentWrapper>
                </Section>
            </Wrapper>
        </Container>
    );
}

export default StoryDetailPage;