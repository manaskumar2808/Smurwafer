import React, { useEffect, useState } from 'react';
import Story from '../../components/story';
import { Container, EmptyContainer, LoaderContainer, Wrapper } from './styles/home';
import * as actions from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Spin, message, Result, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';
import Footer from '../../components/footer';
import Online from '../../components/online';
import TagBar from '../../components/tag-bar';

const HomePage = props => {
    const { openSidebar } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const stories = useSelector(state => state.sty.stories);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);

    // useEffect(() => {}, []);

    useEffect(() => {
        dispatch(actions.fetchStories(token))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                if (err.response) {
                    message.error(err.response.data.message);
                } else {
                    message.error('Something went wrong!');
                }
            });

    }, [token, dispatch]);

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
            <TagBar allFunc={actions.fetchStories} tagFunc={actions.fetchTagStories} />
            <Online />
            {
                stories.length > 0 ? stories.map(story => {
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
                <EmptyContainer>
                    <Empty description="No stories yet" />
                </EmptyContainer>
            }
            </Wrapper>
            <Footer />
        </Container>
    );
}

export default HomePage;