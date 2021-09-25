import { Button } from 'antd';
import React from 'react';
import { Container, Display, Photo, Section, Text } from './styles/suggestor';

const Suggestor = props => {
    const { text, imageUrl, onClick } = props;

    return (
        <Container>
            <Display>
                <Photo src={imageUrl} />
            </Display>
            <Section>
                <Text>
                    {text}
                </Text>
                <div style={{ flex: 1 }}></div>
                <Button type="primary" block onClick={onClick}>Add</Button>
            </Section>
        </Container>
    );
}

export default Suggestor;