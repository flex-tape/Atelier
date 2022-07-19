import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IGCarousel from './IGCarousel.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const MainImg = styled.img`
  max-width: 600px;
  max-height: 600px;
  cursor: zoom-in;
`

export default function ImageGallery (props) {

  return (
    <>
    {props.hasLoaded && <Container>
      <MainImg onClick={()=> props.setShowModal(true)} src={props.productStyle.photos[props.currentIndex].url}/>
      <IGCarousel currentIndex={props.currentIndex} setCurrentIndex={props.setCurrentIndex} productStyle={props.productStyle}/>
    </Container>}
    </>
  )
}