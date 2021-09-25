import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axios-config';
import { Container, LoaderContainer, Wrapper } from './styles/follow';
import { Spin } from 'antd';
import Follow from '../../components/follow';
import { header } from '../../utility/header';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer';
import { useHistory } from 'react-router';

const FollowPage = (props) => {
    const history = useHistory();
    const { openSidebar } = props;

    const token = useSelector(state => state.ath.token);
    const id = useSelector(state => state.ath.id);

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);

    const fetchFollows = useCallback(() => {
        axios.get('api/follow/' + id, header(token))
            .then(response => {
                const { follows } = response.data;
    
                const loadedUsers = [];

                for (let key in follows) {
                    const follow = follows[key];
                    if (follow.follower.id === id) {
                        loadedUsers.push(follow.followed);
                    } else {
                        loadedUsers.push(follow.follower);
                    }
                }
    
                setUsers(loadedUsers);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }, [token, id]) 
    
    useEffect(() => {
        fetchFollows();
    }, [fetchFollows]);

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
                    users.map(u => {
                        return (
                            <Follow key={u.id} user={u} goToProfileView={() => goToProfileView(u.id)} />
                        );
                    })
                }
            </Wrapper>
            <Footer />
        </Container>
    );
}

export default FollowPage;