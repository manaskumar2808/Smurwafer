import { Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React from 'react';
import { baseUrl } from '../../utility/base-url';
import { Container, Display, Photo, Section, Text, Title, IconSection } from './styles/story-card';
import { FaArrowCircleUp, FaArrowCircleDown  } from 'react-icons/fa';
import { useHistory } from 'react-router';

const StoryCard = props => {
    const history = useHistory();
    const { id, imageUrl, title, text, profit } = props;

    const goToStoryDetail = () => {
        history.push('/story-detail/' + id + '/' + title);
    }

    return (
        <Container>
            <Display>
                <Photo src={imageUrl} />
                <IconSection>
                    { profit ? <FaArrowCircleUp fontSize={20} color={"#3f8600"} /> : <FaArrowCircleDown fontSize={20} color={"#cf1322"} /> }
                </IconSection>
            </Display>
            <Section>
                <Title>{title}</Title>
                {/* <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                    <Text>{text}</Text>
                </Paragraph> */}
                <Button type="primary" onClick={goToStoryDetail}  block>See</Button>
            </Section>
        </Container>
    );
}

export default StoryCard;