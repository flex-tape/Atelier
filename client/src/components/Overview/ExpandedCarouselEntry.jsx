import React from 'react';
import styled from 'styled-components';
import { FaCircle, FaHeart } from 'react-icons/fa';

const Image = styled.div`
  object-fit: cover;
  margin: 10px;
  width: 80px;

  img {
    width: 80;
  }
`


export default function ExpandedCarouselEntry (props) {

  const mappedIndex = props.photoArray.map((photo) => (photo.url)).indexOf(props.photo.url);

  return (
    <Image onClick={() => props.setCurrentIndex(mappedIndex)}>
    {props.currentIndex === mappedIndex ? <FaHeart /> : <FaCircle/>}
    </Image>
  )
}