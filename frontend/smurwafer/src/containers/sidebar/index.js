import React from 'react';
import { Menu, Divider, Badge } from 'antd';
import {
    HomeOutlined,
    FireOutlined,
    VideoCameraOutlined,
    CompassOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    AppstoreAddOutlined,
    ContactsOutlined,
    SettingOutlined,
    FlagOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import { Container } from './styles/sidebar';
import { useHistory } from 'react-router';

const Sidebar = props => {
    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    const goToLive = () => {
        history.push('/live');
    }

    const goToTrending = () => {
        history.push('/trending');
    }

    const goToExplore = () => {
        history.push('/explore');
    }

    const goToFollow = () => {
        history.push('/follow');
    }

    const goToBookmark = () => {
        history.push('/bookmark');
    }

    const goToSetting = () => {
        history.push('/setting');
    }

    const goToReport = () => {
        history.push('/report');
    }

    return (
        <Container>
            <Menu
                style={{ width: "100%", height: "100%" }}
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['home']}
            >
                <Menu.Item key="home" onClick={goToHome} icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="trending" onClick={goToTrending} icon={<FireOutlined />}>
                    Trending
                </Menu.Item>
                <Menu.Item key="live" onClick={goToLive} icon={<VideoCameraOutlined />}>
                    Live{' '}<Badge status={'error'} />
                </Menu.Item>
                <Menu.Item key="explore" onClick={goToExplore} icon={<CompassOutlined />}>
                    Explore
                </Menu.Item>
                <Menu.Item key="following" onClick={goToFollow} icon={<UsergroupAddOutlined />}>
                    Following
                </Menu.Item>
                <Menu.Item key="bookmarks" onClick={goToBookmark} icon={<BookOutlined />}>
                    Bookmarks
                </Menu.Item>
                <Menu.Item key="dashboard" icon={<AppstoreAddOutlined />}>
                    Dashboard
                </Menu.Item>
                <Menu.Item key="events" icon={<ContactsOutlined />}>
                    Events
                </Menu.Item>
                <Menu.Item key="settings" onClick={goToSetting} icon={<SettingOutlined />}>
                    Settings
                </Menu.Item>
                <Menu.Item key="report" onClick={goToReport} icon={<FlagOutlined />}>
                    Report
                </Menu.Item>
                <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
                    Help
                </Menu.Item>
            </Menu>
        </Container>
    );
}

export default Sidebar;