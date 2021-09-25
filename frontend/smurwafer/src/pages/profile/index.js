import React, { useEffect, useMemo, useState } from 'react';
import { Container, Performance, PerformanceLegend, Text, PerformanceCard, Bottom, Dashboard, Display, Email, Info, Middle, Name, Photo, StorySection, Top, Username, Section, SuggestionSection, SuggestionLegend, StoryLegend, Theme, Hat, LoaderContainer, Wrapper, ThemePhoto, BioText, BioContainer } from './styles/profile';
import * as actions from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utility/base-url';
import { Button, Divider, Statistic, Row, Col, Spin } from 'antd';
import Suggestor from '../../components/suggestor';
import StoryCard from '../../components/story-card';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { FaRedhat } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { galleryUrl } from '../../utility/media-url';

const defaultProfile = process.env.PUBLIC_URL + '/images/profile/default_profile.jpg';
const themeDefault = process.env.PUBLIC_URL + '/images/default/theme-default.jpeg';
const bioDefault = process.env.PUBLIC_URL + '/images/default/bio-default.jpeg';
const dobDefault = process.env.PUBLIC_URL + '/images/default/dob-default.jpeg';

const ProfilePage = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { openSidebar } = props;

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);

    const token = useSelector(state => state.ath.token);
    const id = useSelector(state => state.ath.id);
    const currentUser = useSelector(state => state.usr.currentUser);
    const userStories = useSelector(state => state.sty.userStories);
    const profile = useSelector(state => state.prf.profile);
    const dashboard = useSelector(state => state.dsh.dashboard);
    const casinoData = useSelector(state => state.dsh.casinoData);

    const [isLoading, setIsLoading] = useState(true);
    const [suggestors, setSuggestors] = useState({
        'profile': false,
        'theme': false,
        'bio': false,
        'dob': false,
    });

    const { userName, name, email, imageUrl } = currentUser;

    const suggestorData = [
        {
            type: 'profile',
            message: 'Add a profile picture',
            image: defaultProfile,
        },
        {
            type: 'theme',
            message: 'Add a theme',
            image: themeDefault,
        },
        {
            type: 'bio',
            message: 'Add your bio',
            image: bioDefault,
        },
        {
            type: 'dob',
            message: 'Add your DOB',
            image: dobDefault,
        },
    ];

    useEffect(() => {
        dispatch(actions.fetchProfile(token, id))
            .then(result => {
                return dispatch(actions.fetchDashboard(token, id))
            })
            .then(result => {
                return dispatch(actions.fetchUserStories(token, id))
            })
            .then(result => {
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }, [token, id, dispatch]);

    useEffect(() => {
        if (profile) {
            if (!imageUrl) {
                setSuggestors(prevState => {
                    return {
                        ...prevState,
                        'profile': true,
                    }
                });
            }
            if (!profile.themeUrl) {
                setSuggestors(prevState => {
                    return {
                        ...prevState,
                        'theme': true,
                    }
                });
            }
            if (!profile.bio) {
                setSuggestors(prevState => {
                    return {
                        ...prevState,
                        'bio': true,
                    }
                });
            }
            if (!profile.dob) {
                setSuggestors(prevState => {
                    return {
                        ...prevState,
                        'dob': true,
                    }
                });
            }
        }
    }, [profile, imageUrl]);

    const config = {
        data: [{ casino: '0', rating: 0 }, ...casinoData],
        height: 400,
        xField: 'casino',
        yField: 'rating',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#1894FF',
            },
        },
    };

    const colors = {
        black: '#000000',
        blue: '#1894ff',
        red: '#cc1804',
        green: '#059605',
        purple: '#53038c',
        pink: '#8c0381',
    };

    const goToUpdateProfile = () => {
        history.push('/update-profile');
    }


    return (    
        <Container>
            {
                isLoading ?
                    <LoaderContainer>
                        <Spin size="large" style={{ position: "absolute", top: "45%", left: "45%" }} />
                    </LoaderContainer>
                        :
                <Wrapper>
                    <Theme>
                        {profile.themeUrl && <ThemePhoto src={baseUrl + profile.themeUrl} />}
                    </Theme>
                    <Top>
                        <Section>
                            <Display>
                                <Photo src={imageUrl ? baseUrl + imageUrl : defaultProfile} />
                            </Display>
                            <Name>{name}</Name>
                        </Section>
                        <Section>
                            <Info>
                                <Username>{userName}</Username>
                                <Email>{email}</Email>
                                <div style={{ flex: 1 }}></div>
                                <Button type="primary" onClick={goToUpdateProfile}>Update Profile</Button>
                                <br />
                                <Hat>
                                    <FaRedhat color={colors[dashboard.hat]} size={40} />
                                    {dashboard.hat} hat
                                </Hat>
                            </Info>
                        </Section>
                        <Section>
                            <Performance>
                                <PerformanceLegend>
                                    Performance
                                </PerformanceLegend>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <PerformanceCard>
                                            <Statistic
                                                title="Best profit"
                                                value={dashboard.bestProfit}
                                                precision={0}
                                                valueStyle={{ color: dashboard.bestProfit >= 0 ? '#3f8600' : '#cf1322' }}
                                                prefix={dashboard.bestProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                // suffix="%"
                                                style={{ position: "absolute", top: "25%", left: "25%" }}
                                            />
                                        </PerformanceCard>
                                    </Col>
                                    <Col span={12}>
                                        <PerformanceCard>
                                            <Statistic
                                                title="Latest profit"
                                                value={dashboard.profit}
                                                precision={0}
                                                valueStyle={{ color: dashboard.profit >= 0 ? '#3f8600' : '#cf1322' }}
                                                prefix={dashboard.profit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                // suffix="%"
                                                style={{ position: "absolute", top: "25%", left: "25%" }}
                                            />
                                        </PerformanceCard>
                                    </Col>
                                </Row>
                            </Performance>
                        </Section>
                        <Section>
                            <div style={{ marginTop: 40 }}></div>
                            <Text>Rating</Text>
                            <Text>Ranking</Text>
                            <Text>Hat</Text>
                        </Section>
                        <Section>
                            <div style={{ marginTop: 40 }}></div>
                            <Text style={{ color: "#1894FF" }}>{dashboard.rating}</Text>
                            <Text style={{ color: "#1894FF" }}>{dashboard.ranking}</Text>
                            <Text style={{ color: "#1894FF" }}>{dashboard.hat}</Text>
                        </Section>
                    </Top>
                    {
                        (suggestors['profile'] || suggestors['theme'] || suggestors['bio'] || suggestors['dob'])
                        &&    
                        <>
                        <Divider orientation="left" style={{ color: "#8a8a8a" }}>
                            Complete your profile
                        </Divider>
                        <SuggestionSection>
                            {
                                suggestorData.map(s => {
                                    if (suggestors[s.type]) {
                                        return (
                                            <Suggestor
                                                imageUrl={s.image}
                                                text={s.message}
                                            />
                                        );
                                    } else {
                                        return null;
                                    }  
                                })   
                            }
                        </SuggestionSection>
                        </>
                    }
                    <Middle>
                            {
                                profile.bio &&
                                <>
                                    <Divider orientation="left" style={{ color: "#8a8a8a" }}>
                                        Bio
                                    </Divider>
                                    <BioContainer>
                                        <BioText>{profile.bio}</BioText>    
                                    </BioContainer>
                                </>
                            }
                        <Divider orientation="left" style={{ color: "#8a8a8a" }}>
                            Progress graph
                        </Divider>
                        <Dashboard>
                            <Line {...config} color="#1894FF"  />
                        </Dashboard>
                    </Middle>
                    <Bottom>
                        <Divider orientation="left" style={{ color: "#8a8a8a" }}>
                            Stories by you
                        </Divider>
                        <StorySection>
                            {
                                userStories.map(story => {
                                    return (
                                        <StoryCard id={story.id} imageUrl={galleryUrl(story.gallery[0])} title={story.title} text={story.text} profit={true} />
                                    );
                                })
                            }
                        </StorySection>
                    </Bottom>
                    <div style={{ height: 200 }}></div>
                </Wrapper>        
            }
        </Container>
    );
}

export default ProfilePage;