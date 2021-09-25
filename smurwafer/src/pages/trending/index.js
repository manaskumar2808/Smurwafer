import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { galleryUrl, mediaUrl } from '../../utility/media-url';
import { Author, AuthorDisplay, AuthorPhoto, AuthorText, Container, Legend, Wrapper, GalleryContainer, GalleryPhoto, Title, Index } from './styles/trending';
import { useHistory } from 'react-router-dom';
import TabBar from '../../components/tag-bar';
import Footer from '../../components/footer';
import { fetchTagTrending, fetchTrending } from '../../store';


const TrendingPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(state => state.ath.token);
    const stories = useSelector(state => state.sty.stories);
    const trending = useSelector(state => state.sty.trending);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchTrending(token))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }, [token, dispatch]);

    const goToStoryDetail = (id, title) => {
        history.push('/story-detail/' + id + '/' + title);
    }

    const goToProfileView = (id) => {
        history.push('/profile-view/' + id);
    }

    const columns = [
        {
            key: 'serialNo',
            title: 'Serial No.',
            render: (value, item, index) => (
                <Index>
                    #{index + 1}
                </Index>
            ),
        },
        {
            key: 'gallery',
            title: 'Gallery',
            render: ({ story }) => (
                <GalleryContainer onClick={() => goToStoryDetail(story.id, story.title)}>
                    <GalleryPhoto src={galleryUrl(story.gallery[0])} />
                </GalleryContainer>
            ),
        },
        {
            key: 'title',
            title: 'Title',
            render: ({ story }) => (
                <Title onClick={() => goToStoryDetail(story.id, story.title)}>
                    {story.title}
                </Title>
            )
        },
        {
            key: 'author',
            title: 'Author',
            render: ({ story }) => (
                <Author onClick={() => goToProfileView(story.author.id)}>
                    <AuthorDisplay>
                        <AuthorPhoto src={mediaUrl(story.author.imageUrl)} alt={story.author.userName} />
                    </AuthorDisplay>
                    <div style={{ width: 10 }} />
                    <AuthorText>
                        {story.author.userName}
                    </AuthorText>
                </Author>
            )
        },
    ];

    return (
        <Container>
            <Wrapper>
                <TabBar allFunc={fetchTrending} tagFunc={fetchTagTrending}  />
                <div style={{ height: 20 }} />
                <Legend>Trending</Legend>
                <Table
                    dataSource={trending}
                    columns={columns}
                />
            </Wrapper>
            <Footer />
        </Container>    
    );
}

export default TrendingPage;