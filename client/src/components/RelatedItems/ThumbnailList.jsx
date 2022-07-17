/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

const ThumbnailImage = styled.img`
display: flex;
// justify-content: center;
// align-items: center;
position: relative;
// top: 30px;
// left: 30px;
height: 60px;
width: 60px;
object-fit: contain;
// margin: 10px;
// background-color: #f0ffff;
background-color: rgba(168,168,168,.7);
z-index: 3;
`

const Container = styled.div`
display: flex;
position: absolute;
`

export default function ThumbnailList ({ id, setRelatedStyleInfo, thumbnailPhotos, relatedStyleInfo }) {
  const [thumbnailLength, setThumbnailLength] = useState([0, 4])
  let slicedThumbnail = thumbnailPhotos.slice(thumbnailLength[0], thumbnailLength[1]);

  const moveCarousel = (arrow) => {
    if (arrow === 'left') {
      setThumbnailLength([thumbnailLength[0] - 1, thumbnailLength[1] - 1])
    } else {
      setThumbnailLength([thumbnailLength[0] + 1, thumbnailLength[1] + 1])
    }
  }

  return (
    <Container>
      {slicedThumbnail.map((photo, index) => (
        <ThumbnailImage key={index} src={photo.thumbnail_url} onClick={() => setRelatedStyleInfo({...relatedStyleInfo, image: photo.thumbnail_url})}/>
      ))}
      {thumbnailLength[0] > 0 ? <FaAngleDoubleLeft onClick={() => moveCarousel('left')}/> : null}
      {thumbnailLength[1] < thumbnailPhotos.length ? <FaAngleDoubleRight onClick={() => moveCarousel('right')}/> : null}
    </Container>
  )
}