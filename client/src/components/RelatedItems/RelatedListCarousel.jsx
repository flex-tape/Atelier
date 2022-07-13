/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { RelatedContext } from './RelatedItems.jsx';
import axios from 'axios';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx'

const RelatedCarousel = styled.div`
display: flex;
max-width: 1300px;
overflow: hidden;
`

export default function RelatedListCarousel() {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [carouselLength, setCarouselLength] = useState([0, 4])

  let relatedItems = useContext(RelatedContext);
  let slicedRelatedItems = relatedItems.slice(carouselLength[0], carouselLength[1]);



  const moveCarousel = (arrow) => {
    if (arrow === 'left') {
      setCarouselLength([carouselLength[0] - 1, carouselLength[1] - 1])
    } else {
      setCarouselLength([carouselLength[0] + 1, carouselLength[1] + 1])
    }
  }

  return (
    <div>
    <RelatedCarousel>
      {slicedRelatedItems.map((item, index) => (
        <RelatedCard item={item} key={index}/>
      ))}
    </RelatedCarousel>
    {carouselLength[0] > 0 ? <button onClick={() => moveCarousel('left')}>Left</button> : null}
    {carouselLength[1] < relatedItems.length ? <button onClick={() => moveCarousel('right')}>Right</button> : null}
    </div>
  )
}