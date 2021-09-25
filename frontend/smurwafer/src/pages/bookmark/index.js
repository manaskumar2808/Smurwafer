import React, { useCallback, useEffect, useState } from 'react';
import { Container, Wrapper, LoaderContainer } from './styles/bookmark';
import * as actions from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import Story from '../../components/story';
import { useHistory } from 'react-router';
import Footer from '../../components/footer';

const BookmarkPage = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const bookmarks = useSelector(state => state.bmk.bookmarks);

    const [isLoading, setIsLoading] = useState(true);

    const fetchBookmarks = useCallback(() => {
        dispatch(actions.fetchBookmarks(token))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }, [token, dispatch]);

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    const goToDetail = (storyId, title) => {
        history.push('/story-detail/' + storyId + '/' + title);
    }

    const goToProfileView = (id) => {
        history.push('/profile-view/' + id);
    }


    if (isLoading) {
        return (
            <Container>
                <LoaderContainer>
                    <Spin size="large" style={{ position: "absolute", top: "45%", left: "45%" }} />
                </LoaderContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Wrapper>
                {
                    bookmarks.map(b => {
                        const { story } = b;
                        return (
                            <Story
                                key={b.id}
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
                    })
                }
            </Wrapper>
            <Footer />
        </Container>
    );
}

export default BookmarkPage;