import React, { useState, useEffect } from 'react';
import {
    Container, Wrapper, Label, Display, Photo, Name, NameContainer, Section
} from './styles/setting';
import { Button, Divider, Select } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utility/base-url';
import * as actions from '../../store';

const SettingPage = props => {
    const { Option } = Select;
    const { openSidebar } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);

    const token = useSelector(state => state.ath.token);
    const currentUser = useSelector(state => state.usr.currentUser);
    const setting = useSelector(state => state.stg.setting);

    const [isLoading, setIsLoading] = useState(false);

    const [language, setLanguage] = useState(setting.language);
    const [emailOnLogin, setEmailOnLogin] = useState(setting.emailOnLogin);
    const [notification, setNotification] = useState(setting.notification);
    const [showNewContent, setShowNewContent] = useState(setting.showNewContent);

    const languages = [
        "english",
        "hindi",
        "french",
        "chinese",
        "spanish",
        "russian",
        "japanese",
        "german",
        "italian",
    ];

    const handleSubmitSettings = () => {
        setIsLoading(true);

        dispatch(actions.updateSetting(token, {
            language,
            emailOnLogin,
            notification,
            showNewContent
        })).then(result => {
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
        });
    }       

    const capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const handleLanguageChange = (l) => {
        setLanguage(l);
    }

    const handleEmailOnLogin = (e) => {
        const v = e.target.checked;
        setEmailOnLogin(v);
    }

    const handleNotification = (e) => {
        const v = e.target.checked;
        setNotification(v);
    }

    const handleShowNewContent = (e) => {
        const v = e.target.checked;
        setShowNewContent(v);
    }       

    return (
        <Container>
            <Wrapper>
                <Section>
                    <Display>
                        <Photo src={baseUrl + currentUser.imageUrl} alt={currentUser.userName} />
                    </Display>
                    <NameContainer>
                        <Name>{currentUser.name}</Name>
                    </NameContainer>
                </Section>
                <Divider />
                <Label>Language</Label>
                <div style={{ height: 10 }}></div>
                <Select defaultValue={languages[0]} value={language} style={{ width: "100%" }} onChange={handleLanguageChange}>
                    {
                        languages.map(l => {
                            return <Option key={l} value={l}>{capitalize(l)}</Option>
                        })
                    }
                </Select>
                <div style={{ height: 10 }}></div>
                <Divider />
                <Label>General Settings</Label>
                <div style={{ height: 10 }}></div>
                <Checkbox checked={emailOnLogin} onChange={handleEmailOnLogin}>
                    <Label>Email on login</Label>
                </Checkbox>
                <div style={{ height: 10 }}></div>
                <Checkbox checked={notification} onChange={handleNotification}>
                    <Label>Notifications allowed</Label>
                </Checkbox>
                <div style={{ height: 10 }}></div>
                <Checkbox checked={showNewContent} onChange={handleShowNewContent}>
                    <Label>Show new content</Label>
                </Checkbox>
                <div style={{ height: 30 }}></div>
                <Button loading={isLoading} type="primary" block onClick={handleSubmitSettings}>Update Settings</Button>
            </Wrapper>
        </Container>
    );
}

export default SettingPage;