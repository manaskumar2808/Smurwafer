import React, { useEffect, useState } from 'react';
import axios from '../../axios-config';
import { Container, Performance, PerformanceLegend, Text, PerformanceCard, Bottom, Dashboard, Display, Email, Info, Middle, Name, Photo, StorySection, Top, Username, Section, SuggestionSection, SuggestionLegend, StoryLegend, Theme, Hat, LoaderContainer, Wrapper, ThemePhoto, BioText, BioContainer } from './styles/profile-view';
import * as actions from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utility/base-url';
import { Button, Divider, Statistic, Row, Col, Spin, Badge } from 'antd';
import Suggestor from '../../components/suggestor';
import StoryCard from '../../components/story-card';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { FaRedhat } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router';
import { header } from '../../utility/header';
import { galleryUrl } from '../../utility/media-url';

const defaultProfile = process.env.PUBLIC_URL + '/images/profile/default_profile.jpg';

const ProfileViewPage = props => {
    const { id } = useParams();

    const { openSidebar } = props;

    useEffect(() => {
        openSidebar();
    }, [openSidebar]);

    const token = useSelector(state => state.ath.token);

    const [user, setUser] = useState({
        userName: '',
        name: '',
        email: '',
        imageUrl: '',
    });
    const [userStories, setUserStories] = useState([]);
    const [profile, setProfile] = useState();
    const [dashboard, setDashboard] = useState();
    const [casinoData, setCasinoData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const { userName, name, email, imageUrl, online } = user;

    useEffect(() => {
        axios.get('api/user/' + id, header(token))
            .then(response => {
                const { user } = response.data;
                setUser(user);

                return axios.get('api/profile/' + id, header(token));
            }).then(response => {
                const { profile } = response.data;
                setProfile(profile);

                return axios.get('api/dashboard/' + id, header(token));
            }).then(response => {
                const { dashboard, casinoData } = response.data;
                setDashboard(dashboard);
                setCasinoData(casinoData);

                return axios.get('api/story/?author=' + id, header(token));
            }).then(response => {
                const { stories } = response.data;
                setUserStories(stories);

                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
            });
    }, [token, id]);


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
                                {
                                    online ?
                                    <Badge color="green" dot offset={[-9, 40]}>
                                        <Display>
                                            <Photo src={imageUrl ? baseUrl + imageUrl : defaultProfile} />
                                        </Display>
                                    </Badge>
                                        :
                                    <Display>
                                        <Photo src={imageUrl ? baseUrl + imageUrl : defaultProfile} />
                                    </Display>   
                                }
                            <Name>{name}</Name>
                        </Section>
                        <Section>
                            <Info>
                                <Username>{userName}</Username>
                                <Email>{email}</Email>
                                <div style={{ flex: 1 }}></div>
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
                            Stories by {name}
                        </Divider>
                        <StorySection>
                            {
                                userStories.map(story => {
                                    return (
                                        <StoryCard key={story.id} id={story.id} imageUrl={galleryUrl(story.gallery[0])} title={story.title} text={story.text} profit={true} />
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

export default ProfileViewPage;