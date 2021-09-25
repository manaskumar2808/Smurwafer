import React, { useState, useEffect } from 'react';
import axios from '../../axios-config';
import { baseUrl } from '../../utility/base-url';
import { Card, Divider, message, Skeleton, Tag, Typography } from 'antd';
import { Container, Wrapper, Section, Display, Photo, Info, Content, Title, TitleSection, ContentSection, TagSection, ActionSection, ActionIcon, CounterContainer, CounterSection, CounterText, AuthorContainer, AuthorSection, AuthorDisplay, AuthorPhoto, AuthorText } from './styles/story';
import { ArrowDownOutlined, ArrowUpOutlined, BookOutlined, ReadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { header } from '../../utility/header';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store';
import { galleryUrl } from '../../utility/media-url';

const Story = props => {
    const dispatch = useDispatch();
    const { id, title, text, tags, gallery, author, goToDetail, goToProfileView } = props;

    const { Paragraph } = Typography;

    const token = useSelector(state => state.ath.token);

    const [up, setUp] = useState(0);
    const [down, setDown] = useState(0);
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [isLoading, setIsLoading] = useState(true);


    const fetchVote = useCallback(async () => {
        const response = await axios.get('api/vote/' + id, header(token));

        if (response.status !== 200) {
            return;
        }

        const { upVotes, downVotes, vote } = response.data;

        if (vote) {
            if (vote.type === 'up') {
                setUpVote(true);
            } else {
                setDownVote(true);
            }
        }
        setUp(upVotes);
        setDown(downVotes);
    }, [id, token]);
    
    const fetchIsBookmarked = useCallback(async () => {
        const response = await axios.get('api/bookmark/is-bookmarked/' + id, header(token));
        
        if (response.status !== 200) {
            setIsLoading(false);
            return;
        }
        
        const { isBookmarked } = response.data;
        setIsBookmarked(isBookmarked);
        setIsLoading(false);
    }, [token, id])

    const bookmark = () => {
        if (isBookmarked) {
            setIsBookmarked(false);
            dispatch(actions.deleteBookmark(token, id))
                .then(result => {
                    message.success('Unbookmarked the story ' + title);
                }).catch(error => {
                    setIsBookmarked(true);
                    message.error('Cannot unbookmark ' + title + ' at the moment!');
                });
        } else {
            setIsBookmarked(true);
            const bookmarkData = {
                id,
                category: 'history',
            };
            
            dispatch(actions.addBookmark(token, bookmarkData))
                .then(result => {
                    message.success('Bookmarked the story ' + title);
                }).catch(error => {
                    setIsBookmarked(false);
                    message.error('Cannot bookmark ' + title + ' at the moment!');
                });
        }
    }

    const fetchIntervalVotes = async () => {
        const response = await axios.get('api/vote/' + id, header(token));

        if (response.status !== 200) {
            return;
        }

        const { upVotes, downVotes } = response.data;

        setUp(upVotes);
        setDown(downVotes);
    }

    // setInterval(() => {
    //     fetchIntervalVotes();
    // }, 5 * 1000);

    useEffect(() => {
        fetchVote();
        fetchIsBookmarked();
    }, [fetchVote, fetchIsBookmarked]);

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

    return (
        <Container>
            {/* <Card hoverable style={{ margin: "auto", width: "100%", height: "100%" }}> */}
                <Wrapper>
                    <Section>
                        <Display>
                            <Photo src={galleryUrl(gallery[0])} />
                            <CounterContainer>
                                <CounterSection>
                                    <ArrowUpOutlined style={{ fontSize: 19, color: "#32a852" }} />
                                    <div style={{ width: 10 }}></div>
                                    <CounterText color={"#32a852"}>{up}</CounterText>
                                </CounterSection>
                                <CounterSection>
                                    <ArrowDownOutlined style={{ fontSize: 19, color: "#c41108" }} />
                                    <div style={{ width: 10 }}></div>
                                    <CounterText color={"#c41108"}>{down}</CounterText>
                                </CounterSection>
                            </CounterContainer>
                            <AuthorContainer onClick={goToProfileView}>
                                <AuthorSection>
                                    <AuthorDisplay>
                                        <AuthorPhoto src={baseUrl + author.imageUrl} />
                                    </AuthorDisplay>
                                </AuthorSection>
                                <div style={{ width: 10 }}></div>
                                <AuthorSection>
                                    <AuthorText>
                                        {author.userName}
                                    </AuthorText>
                                </AuthorSection>
                            </AuthorContainer>
                        </Display>
                    </Section>
                    <Section>
                        <Info>
                            <Skeleton loading={isLoading} active paragraph>
                                <TitleSection>
                                    <Title>{title}</Title>
                                </TitleSection>
                                <TagSection>
                                    {
                                        tags.map(tag => {
                                            return (
                                                <Tag key={tag} color="#1894FF" style={{ cursor: "pointer" }}>#{tag}</Tag>
                                            );
                                        })
                                    }
                                </TagSection>
                                <ContentSection>
                                    <Paragraph ellipsis={{ rows: 10, expandable: false }}>
                                        {text}
                                    </Paragraph>
                                </ContentSection>
                                <ActionSection>
                                    <ActionIcon>
                                        { upVote ? <ArrowUpOutlined style={{ fontSize: 19, color: "#32a852" }} onClick={() => handleVote('up')} /> : <ArrowUpOutlined style={{ fontSize: 19 }} onClick={() => handleVote('up')} /> }
                                    </ActionIcon>
                                    <ActionIcon>
                                        { downVote ? <ArrowDownOutlined style={{ fontSize: 19, color: "#c41108" }} onClick={() => handleVote('down')} /> : <ArrowDownOutlined style={{ fontSize: 19 }} onClick={() => handleVote('down')} />}
                                    </ActionIcon>
                                    <ActionIcon>
                                        <ReadOutlined onClick={goToDetail} style={{ fontSize: 19 }} />
                                    </ActionIcon>
                                    <ActionIcon>
                                        <ShareAltOutlined style={{ fontSize: 19 }} />
                                    </ActionIcon>
                                    <ActionIcon>
                                        { isBookmarked ? <BookOutlined style={{ fontSize: 19, color: "#1894ff" }} onClick={bookmark} /> : <BookOutlined style={{ fontSize: 19 }} onClick={bookmark} /> }
                                    </ActionIcon>
                                </ActionSection>
                            </Skeleton>
                        </Info>
                    </Section>
                </Wrapper>
            {/* </Card> */}
        </Container>
    );
}

export default Story;