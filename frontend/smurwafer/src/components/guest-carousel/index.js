import { Carousel } from 'antd';
import React from 'react';
import { Container, Display, Photo } from './styles/guest-carousel';
import photo1 from '../../images/guest-carousel/jan-jakub-nanista-z9hvkSDWMIM-unsplash.jpg';
import photo2 from '../../images/guest-carousel/halil-ibrahim-cetinkaya-EqKPdyG0lKk-unsplash.jpg';
import photo3 from '../../images/guest-carousel/e056f25368bac7d5640517d4a581e6b7.jpeg';
import photo4 from '../../images/guest-carousel/the-new-york-public-library--rkf6Ducli8-unsplash.jpg';

const GuestCarousel = props => {

    const displays = [
        {
            key: 'd1',
            image: photo1,
        },
        {
            key: 'd2',
            image: photo2,
        },
        {
            key: 'd3',
            image: photo3,
        },
        {
            key: 'd4',
            image: photo4,
        },
    ];

    return (
        <Container>
            <Carousel autoplay>
                {
                    displays.map(d => {
                        return (
                            <Display key={d.key}>
                                <Photo src={d.image} />
                            </Display>
                        );
                    })
                }
            </Carousel>
        </Container>
    );
}

export default GuestCarousel;