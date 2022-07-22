import React from 'react';
import styled from 'styled-components';
import IGCarousel from './IGCarousel.jsx';

const Container = styled.div`
  flex: 3 200px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  object-fit: contain;

  // img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  // }
`
const ImgDiv = styled.img`
  align-self: center;
  margin-right: auto;
  margin-left: auto;
  box-shadow: 7px 7px 7px lightgray;
  max-width: 450px;
  max-height: 500px;
  cursor: zoom-in;
`

export default function ImageGallery (props) {

  const photo = props.productStyle.photos[props.currentIndex].url;

  return (
    <>
    <Container>
      <IGCarousel currentIndex={props.currentIndex} setCurrentIndex={props.setCurrentIndex} productStyle={props.productStyle}/>
      <ImgDiv src={photo === null ? "https://baeclothing.in/wp-content/uploads/2020/05/placeholder-3-2.jpg" : photo} onClick={()=> props.setShowModal(true)}></ImgDiv>
    </Container>
    </>
  )
}