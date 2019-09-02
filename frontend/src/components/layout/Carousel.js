import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import LaptopCarousel from '../../img/laptopcarousel.jpg'
import MobileCarousel from '../../img/mobilecarousel.jpg'
import BookCarousel from '../../img/bookscarousel.jpg'

const items = [
    {
        src: LaptopCarousel,
        altText: 'Slide 1',
        caption: ''
    },
    {
        src: MobileCarousel,
        altText: 'Slide 2',
        caption: ''
    },
    {
        src: BookCarousel,
        altText: 'Slide 3',
        caption: ''
    }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;
