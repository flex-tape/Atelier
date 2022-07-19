import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: auto;
  left: 0;
  min-height: 768px;
  min-width: 500px;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;

`

export default function ExpandedZoomInTest2 (props) {

  var photo = props.productStyle.photos[props.currentIndex].url;

  useEffect (() => {
    var zoom = document.getElementById('zoom');
    zoom.mousemove(function(e){
      var mousePosX = (e.pageX/1500)*100;
      zoom.css('background-position-x', mousePosX +'%');
      var mousePosY = (e.pageY/1300)*100;
      zoom.css('background-position-y', mousePosY +'%');
      console.log(mousePosX, mousePosY);
   });
  }, []);

  return (
    <>
      {props.hasLoaded && <Container id="zoom">
      </Container>}
    </>
  )
}

// background: url(${photo}) no-repeat 0 0 fixed;