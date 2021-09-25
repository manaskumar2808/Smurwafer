import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utility/base-url';
import { Container, Wrapper, Section, ListItem, Display, Photo, Rating, UserName, LoaderContainer, UserNameContainer, RatingContainer } from './styles/leaderboard';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as actions from '../../store';
import { useHistory } from 'react-router';

const Leaderboard = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const token = useSelector(state => state.ath.token);
    const leaderboard = useSelector(state => state.dsh.leaderboard);
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(actions.fetchLeaderboard(token))
        .then(result => {
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
        });
    }, [token, dispatch]);
    
    const goToProfileView = (id) => {
        history.push('/profile-view/' + id);
    }

    if (isLoading) {
        return (
            <Container>
                <Wrapper>
                    <LoaderContainer>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, margin: "auto" }} spin />} />
                    </LoaderContainer>
                </Wrapper>
            </Container>
        );
    }

    return (
        <Container>
            <Wrapper>
                {
                    leaderboard.map(l => {
                        return (
                            <ListItem key={l.id}>
                                <Section>
                                    <UserNameContainer onClick={() => goToProfileView(l.user.id)}>
                                        <Display>
                                            <Photo src={baseUrl + l.user.imageUrl} />
                                        </Display>
                                        <div style={{ width: 10 }}></div>
                                        <UserName>
                                            {l.user.userName}
                                        </UserName>
                                    </UserNameContainer>
                                </Section>
                                <Section>
                                    <RatingContainer>
                                        <Rating>
                                            {l.rating}
                                        </Rating>
                                    </RatingContainer>
                                </Section>
                            </ListItem>
                        );
                    })
                }
            </Wrapper>
        </Container>
    );
}

export default Leaderboard;