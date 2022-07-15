import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IGCarousel from './IGCarousel.jsx';

const Container = styled.div`

  img {
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 600px;
    object-fit: contain;
  }

`
const SubContainer = styled.div`

`

export default function ImageGallery (props) {

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
    {props.hasLoaded && <Container>
      <img src={props.productStyle.photos[currentIndex].url}/>
      <SubContainer>
        <IGCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} productStyle={props.productStyle}/>
      </SubContainer>
    </Container>}
    </>
  )
}