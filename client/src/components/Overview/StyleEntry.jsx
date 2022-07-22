import React from 'react';
import styled from 'styled-components';

const Image = styled.div`
  object-fit: cover;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 65;
    height: 65;
  }
`
export default function StyleEntry (props) {

  var img = props.style.photos[0].thumbnail_url;
  if (img === null) {
    img = "https://baeclothing.in/wp-content/uploads/2020/05/placeholder-3-2.jpg";
  }

  const handleClick = () => {
    props.setStyleID(props.style.style_id);
    const index = props.styleInfo.map((style) => (style.style_id)).indexOf(props.style.style_id);
    props.setProductStyle(props.styleInfo[index]);
  }

  return (
    <Image onClick={handleClick}>
      {props.style.style_id === props.styleID ? <img border="2px solid #000000" width="75" height="75" src={`${img}`}/> : <img width="75" height="75" src={`${img}`}/>}
    </Image>
  )
}