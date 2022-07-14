import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const axios = require('axios');

const Container = styled.div`

  img {
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 600px;
    object-fit: contain;
  }

`

export default function ImageGallery (props) {

  return (
    <Container>
      {props.hasLoaded && <img src={props.productStyle.photos[0].url}/>}
    </Container>
  )
}

// width="100%" height="100%" max-width="600px" max-height="600px"