import React, { useEffect, useState } from 'react';
import axios from '../../axios-config';
import { Container, LoaderContainer, Wrapper } from './styles/explore';
import { Spin } from 'antd';
import Follow from '../../components/follow';
import { header } from '../../utility/header';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer';
import { useHistory } from 'react-router';


const ExplorePage = (props) => {
    const history = useHistory();
    const { openSidebar } = props;

    const token = useSelector(state => state.ath.token);

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);
    
    useEffect(() => {
        axios.get('api/user', header(token))
            .then(response => {
                const { users } = response.data;
                setUsers(users);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }, [token]);

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

export default ExplorePage;