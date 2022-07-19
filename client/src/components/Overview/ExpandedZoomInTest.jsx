import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  .img-zoom-result {
    border: 1px solid #d4d4d4;
    width: 300px;
    height: 300px;
  }

  .img-zoom-lens {
    position: absolute;
    border: 1px solid #d4d4d4;
    width: 40px;
    height: 40px;
  }

`
// const Lens = `
//   position: absolute;
//   width: 80px;
//   height: 80px;
// `
// const ZoomResult = `
//   width: 400px;
//   height: 400px;
// `

const Body = styled.img`
  max-height: 750px;
`

export default function ExpandedZoomInTest (props) {

  const ImageZoom = (imgID, resultID) => {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    console.log(img, result);
    lens = document.createElement("DIV");
    lens.setAttribute('class', 'zoom-lens');
    img.parentElement.insertBefore(lens, img);
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      e.preventDefault();
      pos = getCursorPos(e);
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

  ImageZoom("image", "imageresult");

  return (
    <>
      {props.hasLoaded && <Container class="img-zoom-container">
        <Body id="image" src={props.productStyle.photos[props.currentIndex].url}/>
        <ZoomResult id="imageresult" class="img-zoom-result"></ZoomResult>
      </Container>}
    </>
  )
}