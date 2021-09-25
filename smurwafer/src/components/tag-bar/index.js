import React, { useState } from 'react';
import { Container, Wrapper } from './styles/tab-bar';
import Tag from '../tag';
import { useDispatch, useSelector } from 'react-redux';

const TabBar = ({ tagFunc, allFunc }) => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);

    const [activeId, setActiveId] = useState('t-1');

    const tags = [
        {
            id: 't-1',
            value: 'All',
            color: '#000000',
        },  
        {
            id: 't0',
            value: 'Horror',
            color: '#bd000d',
        },
        {
            id: 't1',
            value: 'Theory',
            color: '#009c1d',
        },
        {
            id: 't2',
            value: 'Mystery',
            color: '#1894ff',
        },
        {
            id: 't3',
            value: 'History',
            color: '#cf0083',
        },
        {
            id: 't4',
            value: 'Sightings',
            color: '#7f00cf',
        },
        {
            id: 't5',
            value: 'Report',
            color: '#cf6e00',
        },
        {
            id: 't6',
            value: 'Plot',
            color: '#00bfb6',
        }
    ];

    const handleTagClick = (id) => {
        setActiveId(id);

        const { value } = tags.find(tg => tg.id === id);

        if (value !== 'All') {
            dispatch(tagFunc(token, value.toLowerCase()));
        } else {
            dispatch(allFunc(token));
        }
    }

    return (
        <Container>
            <Wrapper>
                {
                    tags.map(t => {
                        return (
                            <Tag
                                id={t.id}
                                key={t.id}
                                color={t.color}
                                isActive={t.id === activeId}
                                onPress={() => handleTagClick(t.id)}
                            >
                                {t.value}
                            </Tag>
                        );
                    })
                }
            </Wrapper>
        </Container>
    );
}

export default TabBar;