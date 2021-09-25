import React from 'react';
import { Container, Wrapper, Text } from './styles/tag';

const Tag = ({ children, id, color, isActive, onPress }) => {
    return (
        <Container onClick={onPress}>
            <Wrapper isActive={isActive} color={color}>
                <Text isActive={isActive} color={color}>{children}</Text>
            </Wrapper>
        </Container>
    );
}

export default Tag;