import React, { useEffect, useState } from 'react';
import Navigation from '../navigation';
import { Navbar, Sidebar as Side, Content, Container, Division, Section } from './styles/layout';
import { Switch, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home';
import LogoutPage from '../../pages/logout';
import GuestRoute from '../../guards/guest-route';
import AuthRoute from '../../guards/auth-route';
import ProfilePage from '../../pages/profile';
import CreatePage from '../../pages/create';
import Sidebar from '../sidebar';
import LoginPage from '../../pages/login';
import SignupPage from '../../pages/signup';
import StoryDetailPage from '../../pages/story-detail';
import UpdateProfilePage from '../../pages/update-profile';
import Footer from '../../components/footer';
import { notification } from 'antd';
import { io } from 'socket.io-client';
import { baseUrl } from '../../utility/base-url';
import { useSelector } from 'react-redux';
import Leaderboard from '../leaderboard';
import ProfileViewPage from '../../pages/profilt-view';
import ExplorePage from '../../pages/explore';
import FollowPage from '../../pages/follow';
import BookmarkPage from '../../pages/bookmark';
import ReportPage from '../../pages/report';
import SearchPage from '../../pages/search';
import SettingPage from '../../pages/setting';
import NotFoundPage from '../../pages/not-found';
import socket from '../../socket-config';
import LivePage from '../../pages/live';
import TrendingPage from '../../pages/trending';

const Layout = props => {
    const location = useLocation();
    // const currentUser = useSelector(state => state.usr.currentUser);

    const [open, setOpen] = useState(false);
    const [x, setX] = useState(0);

    const toggleSidebar = () => {
        if (open) {
            setOpen(false);
            setX(0);
        } else {
            setOpen(true);
            setX(15);
        }
    }

    const openSidebar = () => {
        setOpen(true);
        setX(17);
    }

    const closeSidebar = () => {
        setOpen(false);
        setX(0);
    }

    const openNotification = (msg) => {
        notification.open({
            message: 'Result out!',
            description: msg,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const openJoinNotification = (msg) => {
        notification.open({
            message: msg,
            description: 'Say Hello!',
        });
    };


    useEffect(() => {
        socket.on('entered', data => {
            openJoinNotification(data.message);
        });

        socket.on('result', ({ message }) => {
            openNotification(message);
        });
    });

    return (
        <Container>
            <Navbar>
                <Navigation toggleSidebar={toggleSidebar} />
            </Navbar>
            <Division>
                { open && <Section width={x}>
                    <Side>
                        <Sidebar />
                    </Side>
                </Section> }
                <Section width={100 - 2 * x}>
                    <Content>
                        <Switch>
                            <GuestRoute path={"/login"} exact>
                                <LoginPage closeSidebar={closeSidebar} />
                            </GuestRoute>
                            <GuestRoute path={"/signup"} exact>
                                <SignupPage closeSidebar={closeSidebar} />
                            </GuestRoute>
                            <AuthRoute path={"/create"} exact>
                                <CreatePage closeSidebar={closeSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/profile"} exact>
                                <ProfilePage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/profile-view/:id"} exact>
                                <ProfileViewPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/update-profile"} exact>
                                <UpdateProfilePage closeSidebar={closeSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/live"} exact>
                                <LivePage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/trending"} exact>
                                <TrendingPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/explore"} exact>
                                <ExplorePage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/search/:type/:search"} exact>
                                <SearchPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/follow"} exact>
                                <FollowPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/bookmark"} exact>
                                <BookmarkPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/setting"} exact>
                                <SettingPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/report"} exact>
                                <ReportPage openSidebar={openSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/logout"} exact>
                                <LogoutPage />
                            </AuthRoute>
                            <AuthRoute path={"/story-detail/:id/:title"} exact>
                                <StoryDetailPage closeSidebar={closeSidebar} />
                            </AuthRoute>
                            <AuthRoute path={"/"} exact>
                                <HomePage openSidebar={openSidebar} />
                            </AuthRoute>
                            <GuestRoute>
                                <NotFoundPage closeSidebar={closeSidebar} />
                            </GuestRoute>
                        </Switch>
                    </Content>
                </Section>
                { open &&
                    <Section width={x}>
                        { location.pathname === "/" && <Leaderboard /> }
                    </Section>
                }
            </Division>
            {/* <Footer /> */}
        </Container>
    );
}

export default Layout;