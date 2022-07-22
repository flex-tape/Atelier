import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  object-fit: cover;
  margin: 10px;
  height: 75px;
  box-shadow: 7px 7px 7px lightgray;
  cursor: e-resize;
  border: ${props => props.selected ? '2px solid #000000' : '2px solid #e6feff'}

  // img {
  //   height: 70;
  // }
`
Image.defaultProps = {
  selected: false
}

export default function IGCarouselEntry (props) {

  const mappedIndex = props.photoArray.map((photo) => (photo.url)).indexOf(props.photo.url);

  return (
    <Image onClick={() => props.setCurrentIndex(mappedIndex) } src={props.photo.thumbnail_url} selected={props.currentIndex === mappedIndex} />
  )
}
