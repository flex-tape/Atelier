import React from 'react';
import styled from 'styled-components';

const Image = styled.div`
  object-fit: cover;
  margin: 10px;
  height: 70px;
  box-shadow: 7px 7px 7px lightgray;

  img {
    height: 70;
  }
`

export default function IGCarouselEntry (props) {

  const mappedIndex = props.photoArray.map((photo) => (photo.url)).indexOf(props.photo.url);

  return (
    <Image onClick={() => props.setCurrentIndex(mappedIndex)}>
    {props.currentIndex === mappedIndex ? <img border="2px solid #000000" src={props.photo.thumbnail_url}/> : <img src={props.photo.thumbnail_url}/>}
    </Image>
  )
}