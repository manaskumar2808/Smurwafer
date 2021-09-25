import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Container, Left, SearchSection, Right, NavItem, Nav, Brand } from './styles/navigation';
import { useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation, useRouteMatch } from 'react-router';
import Search from '../../components/search';

const Navigation = props => {
    const history = useHistory();
    const match = useRouteMatch('/profile-view/:id');
    const location = useLocation();

    const isAuthenticated = useSelector(state => state.ath.token !== null);
    let type = '';

    if (location.pathname === '/explore' || location.pathname === '/follow' || location.pathname === '/profile' || (match && match.path === '/profile-view/:id')) {
        type = 'user';
    } 


    const goToHome = () => {
        history.push('/');
    }       

    return (
        <Container>
            <Left>
                <div style={{ width: 10 }}></div>
                <MenuOutlined onClick={props.toggleSidebar} color={"#1890FF"} />
                <div style={{ width: 15 }}></div>
                <Brand onClick={goToHome}>Smurwafer</Brand>
            </Left>
            <SearchSection>
                {(location.pathname !== '/login' && location.pathname !== '/signup') && <Search type={type} />}
            </SearchSection>
            {
                !isAuthenticated ?
                <Right>
                    <NavItem>
                        <Nav to={"/login"} exact>
                            <Button type="primary">Login</Button>
                        </Nav>
                    </NavItem>
                    <NavItem>
                        <Nav to={"/signup"} exact>
                            <Button type="ghost">Signup</Button>
                        </Nav>
                    </NavItem>
                </Right>
                    :
                <Right>
                    <NavItem>
                        <Nav to={"/create"} exact>
                            Create
                        </Nav>
                    </NavItem>
                    <NavItem>
                        <Nav to={"/profile"} exact>
                            Profile
                        </Nav>
                    </NavItem>
                    <NavItem>
                        <Nav to={"/logout"} exact>
                            Logout
                        </Nav>
                    </NavItem>
                </Right>
            }
        </Container>
    );
}

export default Navigation;