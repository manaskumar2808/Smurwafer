import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../axios-config';
import { Container, Result, Section, Display, Photo, TitleContainer, Title, ResultContainer } from './styles/search';
import { Input, Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../utility/base-url';
import { header } from '../../utility/header';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { galleryUrl } from '../../utility/media-url';

const defaultProfile = process.env.PUBLIC_URL + '/images/profile/default_profile.jpg';

const Search = props => {
    const { Search } = Input;
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const wrapperRef = useRef(null);
    const [type, setType] = useState('');

    
    useEffect(() => {
        if (location.pathname === '/explore' || location.pathname === '/follow' || location.pathname === '/profile' || (match && match.path === '/profile-view/:id')) {
            setType('user');
        } else if(location.pathname === '/' || location.pathname === '/bookmark' || (match && match.path === '/story-detail/:id/:title')) {
            setType('story');
        }
    }, [location, match]);

    const token = useSelector(state => state.ath.token);

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [searchIndex, setSearchIndex] = useState(0);

    const goToSearch = useCallback(() => {
        history.push('/search/' + type + '/' + search);
    }, [search, history, type]);

    const goToDetail = useCallback((storyId, title) => {
        setSearch(title);
        history.push('/story-detail/' + storyId + '/' + title);
    }, [history]);

    const goToProfileView = useCallback((id, userName) => {
        setSearch(userName);
        history.push('/profile-view/' + id);
    }, [history]);



    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setResults([]);
            }
        }

        const handleKeyDown = (e) => {
            const searchEle = document.getElementById('search');
            if (document.activeElement === searchEle) {
                const keyCode = e.code;
                if (keyCode === "ArrowUp") {
                    if (searchIndex > 0) {
                        setSearchIndex(prevState => prevState - 1);
                    } else {
                        setSearchIndex(results.length - 1);
                    }
                } else if(keyCode === "ArrowDown") {
                    if (searchIndex < results.length - 1) {
                        setSearchIndex(prevState => prevState + 1);
                    } else {
                        setSearchIndex(0);
                    }
                } else if (keyCode === "Enter") {
                    if (results.length > 0) {
                        if (type === 'story') {
                            const id = results[searchIndex].item.id;
                            const title = results[searchIndex].item.title;
                            goToDetail(id, title);
                        } else {
                            const id = results[searchIndex].item.id;
                            const userName = results[searchIndex].item.userName;
                            goToProfileView(id, userName);
                        }
                    } else {
                        goToSearch();
                    }
    
                    setResults([]);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        wrapperRef,
        results, 
        searchIndex, 
        goToDetail, 
        goToSearch, 
        goToProfileView, 
        type
    ]);

    const handleSearch = useCallback(async () => {
        if (search.trim().length > 0) {
            const response = await axios.get('api/search?type=' + type + '&input=' + search, header(token));
    
            if (response.status !== 200) {
                return;
            }
    
            const { results } = response.data;
            setResults(results);
        } else {
            setResults([]);
        }
    }, [search, token, type]);
    
    useEffect(() => {
        handleSearch();

        return () => {
            setResults([]);
        };
    }, [handleSearch]);

    return (
        <Container>
            <Search
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onSearch={goToSearch}
                enterButton
                style={{ margin: 0 }}
                id="search"
                autoComplete="off"
                autoCorrect="off"
            />
            {results.length > 0 &&
                <ResultContainer ref={wrapperRef}>
                {
                    results.map(({ item }, index) => {
                        const r = item;
                        return type === 'story' ? (
                            <Result active={searchIndex === index} key={r.id} onClick={() => goToDetail(r.id, r.title)}>
                                <Section>
                                    <Display>
                                        <Photo src={galleryUrl(r.gallery[0])} alt={r.title} />
                                    </Display>
                                </Section>
                                <div style={{ width: 10 }}></div>
                                <Section>
                                    <TitleContainer>
                                        <Title>
                                            {r.title}
                                        </Title>
                                    </TitleContainer>
                                </Section>
                            </Result>
                        ) : (
                            <Result active={searchIndex === index} key={r.id} onClick={() => goToProfileView(r.id)}>
                                <Section>
                                    <Display>
                                        <Photo src={r.imageUrl ? baseUrl + r.imageUrl : defaultProfile} alt={r.name} />
                                    </Display>
                                </Section>
                                <div style={{ width: 10 }}></div>
                                <Section>
                                    <TitleContainer>
                                        <Title>
                                            {r.userName}
                                        </Title>
                                    </TitleContainer>
                                </Section>
                            </Result>
                        );
                    })
                }
                </ResultContainer>
            }
        </Container>
    );
}

export default Search;