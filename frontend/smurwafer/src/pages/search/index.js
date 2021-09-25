import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axios-config';
import Story from '../../components/story';
import { Container, LoaderContainer, Wrapper } from './styles/search';
import * as actions from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { useHistory, useParams } from 'react-router';
import Footer from '../../components/footer';
import { header } from '../../utility/header';
import Follow from '../../components/follow';

const SearchPage = props => {
    const { openSidebar } = props;
    const history = useHistory();
    const { type, search } = useParams();

    const token = useSelector(state => state.ath.token);

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);

    const handleSearch = useCallback(async () => {
        if (search.trim().length > 0) {
            const response = await axios.get('api/search?type=' + type + '&input=' + search, header(token));

            if (response.status !== 200) {
                return;
            }

            const { results } = response.data;
            setResults(results);
            setIsLoading(false);
        } else {
            setResults([]);
            setIsLoading(false);
        }

        return () => {
            setResults([]);
        };
    }, [token, search, type]);
    
    useEffect(() => {
        handleSearch();

        return () => {
            setResults([]);
        };
    }, [handleSearch]);

    const goToDetail = (storyId, title) => {
        history.push('/story-detail/' + storyId + '/' + title);
    }

    const goToProfileView = (id) => {
        history.push('/profile-view/' + id);
    }

    return (    
        <Container>
            {
                isLoading ?
                    <LoaderContainer>
                        <Spin size="large" style={{ position: "absolute", top: "45%", left: "45%" }} />
                    </LoaderContainer>
                    :
                    type === 'story' ?
                    results.map(({ item }) => {
                        const story = item;
                        return (
                            <Story
                                key={story.id}
                                id={story.id}
                                title={story.title}
                                text={story.text}
                                tags={story.hashtags}
                                gallery={story.gallery}
                                author={story.author}
                                goToDetail={() => goToDetail(story.id, story.title)}
                                goToProfileView={() => goToProfileView(story.author.id)}
                            />
                        );
                    }) :
                    <Wrapper>
                        {
                            results.map(({ item }) => {
                                const u = item;
                                return (
                                    <Follow
                                        key={u.id}
                                        user={u}
                                        goToProfileView={() => goToProfileView(u.id)}
                                    />
                                );
                            })
                        }
                    </Wrapper>
            }
            <Footer />
        </Container>
    );
}

export default SearchPage;