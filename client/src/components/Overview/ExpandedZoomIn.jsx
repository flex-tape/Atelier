import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  align-items: all;
`

const ZoomArea = styled.figure`
  width: 800px;
  height: 500px;
  overflow: hidden;
  border: 1px #fff;
  position: relative;
`

const ZoomImg = styled.img`
  max-width: 100%;
  min-width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`

export default function ExpandedZoomIn (props) {

  return (
    <>
      {props.hasLoaded && <Container>
        <ZoomArea>
          <ZoomImg src={props.productStyle.photos[props.currentIndex].url}/>
        </ZoomArea>
      </Container>}
    </>
  )
}