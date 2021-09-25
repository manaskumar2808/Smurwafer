import React, { useEffect, useState } from 'react';
import { Container, Wrapper, List, Top, Legend, Cover, Display, Name, NameContainer, Photo, Section, Dot } from './styles/online';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utility/base-url';
import * as actions from '../../store';
import { RedoOutlined } from '@ant-design/icons';
import { Badge, message, notification,  } from 'antd';
import { useHistory } from 'react-router';
import socket from 'socket.io-client';

const defaultProfile = process.env.PUBLIC_URL + '/images/profile/default_profile.jpg';

const Online = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const id = useSelector(state => state.ath.id);
    const currentUser = useSelector(state => state.usr.currentUser);
    const onlineUsers = useSelector(state => state.usr.onlineUsers);

    const [isLoading, setIsLoading] = useState(false);

    const fetchOnlineUsers = () => {
        setIsLoading(true);
        dispatch(actions.fetchOnlineUsers(token))
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                if (err.response) {
                    message.error(err.response.data.message);
                } else {
                    message.error('Cannot fetch online users');
                }
            });
    }

    const goToProfile = () => {
        history.push('/profile');
    }

    const goToProfileView = (id) => {
        history.push('/profile-view/' + id);
    }

    return (
        <Container>
            <Wrapper>
                <Top>
                    <Legend>
                        Online users
                    </Legend>
                    <RedoOutlined style={{ cursor: "pointer", color: "#1894FF" }} onClick={fetchOnlineUsers} />
                </Top>
                <div style={{ height: 10 }}></div>
                <List>
                    {currentUser && <Section key={id} onClick={goToProfile}>
                        <Badge dot={true} color="#1894FF" offset={[0, 10]}>
                            <Cover>
                                <Display>
                                    <Photo src={currentUser.imageUrl ? baseUrl + currentUser.imageUrl : defaultProfile} alt={currentUser.userName} />
                                </Display>
                            </Cover>
                        </Badge>
                        <NameContainer>
                            <Name>{currentUser.name}</Name>
                        </NameContainer>
                    </Section>}
                    {
                        onlineUsers.map(c => {
                            let u;
                            if (c.userA.id === id) {
                                u = c.userB;
                            } else {
                                u = c.userA;
                            }
                            if (u.online) {
                                return (
                                    <Section key={u.id}  onClick={() => goToProfileView(u.id)}>
                                        <Badge dot={true} status="success" offset={[0, 10]}>
                                            <Cover>
                                                <Display>
                                                    <Photo src={u.imageUrl ? baseUrl + u.imageUrl : defaultProfile} alt={u.userName} />
                                                </Display>
                                            </Cover>
                                        </Badge>
                                        <NameContainer>
                                            <Name>{u.name}</Name>
                                        </NameContainer>
                                    </Section>
                                );
                            } else {
                                return null;
                            }
                        })
                    }
                </List>
            </Wrapper>
        </Container>
    );
}

export default Online;