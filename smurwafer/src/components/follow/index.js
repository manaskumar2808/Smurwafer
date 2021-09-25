import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axios-config';
import { baseUrl } from '../../utility/base-url';
import { header } from '../../utility/header';
import { Container, Photo, Display, ButtonContainer } from './styles/follow';
import { Button, Card, message } from 'antd';
import { useSelector } from 'react-redux';

const defaultProfile = process.env.PUBLIC_URL + '/images/profile/default_profile.jpg';

const Follow = props => {
    const { user, goToProfileView } = props;
    const { Meta } = Card;

    const token = useSelector(state => state.ath.token);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followText, setFollowText] = useState('follow');
    const [isLoading, setIsLoading] = useState(true);

    const checkIfFollowing = useCallback(() => {
        axios.get('api/follow/is-following/' + user.id, header(token))
            .then(response => {
                const { isFollowing, followText } = response.data;
                setIsLoading(false);

                setFollowText(followText);

                if (isFollowing)
                    setIsFollowing(true);
                else
                    setIsFollowing(false);
            }).catch(err => {
                // error fetching if the user is followed or not
                setIsLoading(false);
            });
    }, [token, user]);

    useEffect(() => {
        checkIfFollowing();
    }, [checkIfFollowing]);

    const follow = () => {
        setIsLoading(true);
        if (isFollowing) {
            setIsFollowing(false);
            axios.delete('api/follow/' + user.id, header(token))
                .then(response => {
                    setIsLoading(false);
                    setFollowText(response.data.followText);
                    message.warning('Just unfollowed ' + user.userName);
                }).catch(err => {
                    setIsLoading(false);
                    message.error('Error while unfollowing ' + user.userName);
                    setIsFollowing(true);
                });
        } else {
            setIsFollowing(true);
            axios.post('api/follow', { followed: user.id }, header(token))
                .then(response => {
                    setIsLoading(false);
                    setFollowText(response.data.followText);
                    message.success('Started following ' + user.userName);
                }).catch(err => {
                    setIsLoading(false);
                    message.error('Error while following ' + user.userName);
                    setIsFollowing(false);
                });
        }
    }

    return (
        <Container>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={
                    <Display onClick={goToProfileView}>
                        <Photo alt="profile-image" src={user.imageUrl ? baseUrl + user.imageUrl : defaultProfile} />
                    </Display>
                }
            >
                <Meta title={user.userName} description={user.name}  />
                <ButtonContainer>
                    <Button disabled={isLoading} type="primary" onClick={follow} block>
                        {followText}
                    </Button>
                </ButtonContainer>
            </Card>
        </Container>
    );  
}

export default Follow;