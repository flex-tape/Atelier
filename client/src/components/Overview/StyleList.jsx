import React from 'react';
import styled from 'styled-components';
import StyleEntry from './StyleEntry.jsx';

const Container = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  border: 0;
`

export default function StyleList (props) {

  return (
    <Container>
      {props.styleInfo.map((style, key) => (
        <StyleEntry styleInfo={props.styleInfo} setStyleID={props.setStyleID} setProductStyle={props.setProductStyle} styleID={props.styleID} key={key} style={style}/>
      ))}
    </Container>
  )
}

