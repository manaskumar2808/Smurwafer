import React from 'react';
import { Container, Wrapper, Legend, ButtonSection } from './styles/logout';
import { Button, message } from 'antd';

import * as actions from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const LogoutPage = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);

    const logout = () => {
        // if (token) {
        //     dispatch(actions.userOnlineStatus(token, { online: false }))
        //         .then(result => {
        //             return dispatch(actions.logout());
        //         }).then(result => {
        //             history.push('/login');
        //         }).catch(err => {
        //             message.error('Error logging out');
        //         });
        // } else {
        // }
        dispatch(actions.logout())
            .then(result => {
                history.push('/login');
            }).catch(err => {
                message.error('Error logging out');
            });
    }

    const goBack = () => {
        history.goBack();
    }

    return (    
        <Container>
            <Wrapper>
                <Legend>Are you sure you want to logout ?</Legend>
                <ButtonSection>
                    <Button type="primary" onClick={logout}>Yes</Button>
                    <div style={{ width: 15 }}></div>
                    <Button type="default" onClick={goBack}>No</Button>
                </ButtonSection>
            </Wrapper>
        </Container>
    );
}

export default LogoutPage;