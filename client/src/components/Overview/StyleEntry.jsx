import React from 'react';
import styled from 'styled-components';

const Image = styled.div`
  object-fit: cover;
  margin: 15px;
  width: 70px;
  height: 70px;

  img {
    width: 75;
    height: 75;
  }
`
export default function StyleEntry (props) {

  const handleClick = () => {
    props.setStyleID(props.style.style_id);
    const index = props.styleInfo.map((style) => (style.style_id)).indexOf(props.style.style_id);
    props.setProductStyle(props.styleInfo[index]);
  }

  return (
    <Image onClick={handleClick}>
      {props.style.style_id === props.styleID ? <img border="2px solid #000000" width="75" height="75" src={`${props.style.photos[0].thumbnail_url}`}/> : <img width="75" height="75" src={`${props.style.photos[0].thumbnail_url}`}/>}
    </Image>
  )
}

  // flex: 1 0 21%;
  // margin: 5px;
  // height: 50px;