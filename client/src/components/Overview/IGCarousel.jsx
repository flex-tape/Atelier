import React, { useState} from 'react';
import styled from 'styled-components';
import IGCarouselEntry from './IGCarouselEntry.jsx';

const Container = styled.div`
  display: flex;
  max-width: 600px;
  overflow: hidden;
  border: 1px dotted;
`

const InvButton = styled.button`
  visibility: hidden;
`

export default function IGCarousel (props) {

  const [carouselArray, setCarouselArray] = useState([0, 7]);

  const slicedArray = props.productStyle.photos.slice(carouselArray[0], carouselArray[1]);

  const handleCarousel = (direction) => {
    if (direction === 'left') {
      setCarouselArray([carouselArray[0] - 1, carouselArray[1] - 1]);
      props.setCurrentIndex(prevCurrentIndex => prevCurrentIndex - 1);
    } else {
      setCarouselArray([carouselArray[0] + 1, carouselArray[1] + 1]);
      props.setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
    }
  }

  return (
    <Container>
      {carouselArray[0] > 0 ? <button onClick={() => handleCarousel('left')}>←</button> : <InvButton>→</InvButton>}
      {slicedArray.map((photo, index) => (
        <IGCarouselEntry photoArray={props.productStyle.photos} currentIndex={props.currentIndex} key={index} setCurrentIndex={props.setCurrentIndex} photo={photo} />
      ))}
      {carouselArray[1] < props.productStyle.photos.length ? <button onClick={() => handleCarousel('right')}>→</button> : <InvButton>→</InvButton>}
    </Container>
  )
}